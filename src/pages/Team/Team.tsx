import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useTeamDetail from "@hooks/useTeamDetail.hook";
import { Link, Redirect, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import {
  Card,
  Col,
  Container,
  Form,
  Overlay,
  Row,
  Breadcrumb,
} from "react-bootstrap";
import Spinner from "@components/Spinner/Spinner";
import Member from "@components/Team/Member";
import { Team as TeamIntf, User } from "@type/team.type";
import { debounce } from "lodash";
import { Helmet } from "react-helmet";


interface Params {
  teamId: string;
}

const Team = () => {
  // getting teamId from `/team/:teamId`
  let { teamId } = useParams<Params>();

  const {
    updatedTeam,
    membersLoading,
    teamLeadLoading,
    teamLoading,
  } = useTeamDetail(teamId);

  /* -------------------------- start search function ------------------------- */
  const [userInput, setUserInput] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const toolTipTarget = useRef(null);

  // membersClone is used for search, including the teamlead
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
    (searchString: string) => {
      const _self = debounce((searchString: string) => {
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
      }, 500);

      _self(searchString);
    },
    [setSearchResults, membersClone]
  );

  const handleOnChange = (searchString: string) => {
    setUserInput(searchString);
    searchMembers(searchString);
  };

  /* ------------------------- end of search function ------------------------- */

  const renderTitle = (team: TeamIntf) => {
    return (
      <Row className="d-flex justify-content-between">
        <Col className="d-flex align-items-center">{team.name}</Col>
        <Col sm={4} className="d-flex justify-content-end">
          <Form>
            <Form.Control
              ref={toolTipTarget}
              type="text"
              placeholder="search member"
              value={userInput}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            />
          </Form>

          <Overlay
            target={toolTipTarget.current}
            show={userInput ? true : false}
            placement="bottom"
          >
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                {...props}
                style={{
                  backgroundColor: "rgba(30, 30, 30, 0.8)",
                  padding: "2px 10px",
                  color: "white",
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                found {searchResults.length} results
              </div>
            )}
          </Overlay>
            <p>Change</p>
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
      <>
        <Helmet>
          <title>{updatedTeam.name}</title>
        </Helmet>
        <Container>
          <Row>
            <TeamBreadcrumb>
              <Link className="breadcrumb-item" to={"/"}>
                Home
              </Link>
              <Breadcrumb.Item active>{updatedTeam.name}</Breadcrumb.Item>
            </TeamBreadcrumb>
          </Row>
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
      </>
    );
  } else {
    return <>Nothing to show</>;
  }
};

export default Team;

const TeamCard = styled(Card)`
  width: 100%;
`;

const TeamBreadcrumb = styled(Breadcrumb)`
  & > ol {
    margin-bottom: 0;
    background: transparent;
  }
`;
