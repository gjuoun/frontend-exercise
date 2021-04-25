import React, { useCallback, useEffect, useMemo, useState } from "react";
import useTeamDetail from "@hooks/useTeamDetail.hook";
import { Redirect, useParams } from "react-router-dom";
import TeamPreview from "@components/Team/TeamPreview";
import styled from "styled-components/macro";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Spinner from "@components/Spinner/Spinner";
import Member from "@components/Team/Member";
import { Team as TeamIntf, User } from "@type/team.type";
import { debounce } from "lodash";

interface Params {
  teamId: string;
}

const Team = () => {
  // getting teamId from `/team/:teamId`
  let { teamId } = useParams<Params>();

  const [userInput, setUserInput] = useState("");

  const {
    updatedTeam,
    membersLoading,
    teamLeadLoading,
    teamLoading,
  } = useTeamDetail(teamId);

  const [searchResults, setSearchResults] = useState<User[]>([]);

  const membersClone = useMemo(() => {
    if (updatedTeam?.members && updatedTeam?.teamLead) {
      const newMembers = [{ ...updatedTeam.teamLead }, ...updatedTeam.members];
      return newMembers;
    } else {
      return [];
    }
  }, [updatedTeam?.members, updatedTeam?.teamLead]);

  useEffect(() => {
    if (membersClone.length) {
      setSearchResults(membersClone);
    }
  }, [membersClone, setSearchResults]);

  const searchMembers = useCallback(
    debounce((searchString: string) => {
      setSearchResults(() => {
        const inputLowerCase = searchString.toLowerCase();
        const findMembers = membersClone.filter((member) => {
          const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
          if (fullName.includes(inputLowerCase)) {
            return true;
          } else {
            return false;
          }
        });
        return findMembers;
      });
    }, 500),
    [setSearchResults, membersClone]
  );

  const handleOnChange = (searchString: string) => {
    setUserInput(searchString);
    searchMembers(searchString);
  };

  const renderTitle = (team: TeamIntf) => {
    return (
      <Row className="d-flex justify-content-between">
        <Col className="d-flex align-items-center">{team.name}</Col>
        <Col sm={4} className="d-flex justify-content-end">
          <Form>
            <Form.Control
              type="text"
              placeholder="search member"
              value={userInput}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            />
          </Form>
        </Col>
      </Row>
    );
  };

  const renderList = (searchResults: User[]) => {
    return (
      <Row>
        {searchResults.map((member) => {
          return (
            <Member key={member.id} member={member} role={member.role}></Member>
          );
        })}
      </Row>
    );
  };

  if (!teamId) {
    return <Redirect to={"/"}></Redirect>;
  } else if (membersLoading || teamLoading || teamLeadLoading) {
    return <Spinner height="20rem"></Spinner>;
  } else if (updatedTeam) {
    return (
      <Container>
        <Row>
          <TeamCard>
            <Card.Body>
              <Card.Title>{renderTitle(updatedTeam)}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                View team members
              </Card.Subtitle>
              {renderList(searchResults)}
            </Card.Body>
          </TeamCard>
        </Row>
      </Container>
    );
  } else {
    return <>Nothing to show</>;
  }
};

export default Team;

const TeamCard = styled(Card)`
  margin-top: 1rem;
  width: 100%;
`;
