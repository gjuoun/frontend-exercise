import React from "react";
import useOverview from "@hooks/useOverview.hook";
import { RawTeam } from "@type/team.type";
import Navigation from "@components/Navigation./Navigation";
import { Card, Container, Pagination, Row } from "react-bootstrap";
import Spinner from "@components/Spinner/Spinner";
import Teams from "../../components/TeamList/TeamList";
import styled from "styled-components/macro";

interface Props {
  children?: React.ReactNode;
}

const Overview = (props: Props) => {
  const {
    rawTeams,
    rawTeamsLoading,
    pageNum,
    pageLimit,
    setPageLimit,
    setPageNum,
  } = useOverview();

  const renderRawTeams = (teams: RawTeam[]) => {
    if (rawTeamsLoading) {
      return <Spinner></Spinner>;
    }

    const start = (pageNum - 1) * pageLimit;
    const end = pageNum * pageLimit;
    const teamSlice = teams.slice(start, end);
    return <Teams pageNum={pageNum} rawTeams={teamSlice}></Teams>;
  };

  const renderPagination = (teams: RawTeam[]) => {
    const totalPages = Math.floor(teams.length / pageLimit);
    const pages = [];
    for (let num = 1; num <= totalPages; num++) {
      pages.push(
        <Pagination.Item
          key={`page-${num}`}
          active={num === pageNum}
          onClick={() => setPageNum(num)}
        >
          {num}
        </Pagination.Item>
      );
    }
    return pages;
  };

  // return <>{renderRawTeams(rawTeams)}</>;

  return (
    <div>
      <Navigation></Navigation>
      <Container>
        <Row>
          <OverviewCard>
            <Card.Body>
              <Card.Title>Overview</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Click team name to view on the new page
              </Card.Subtitle>
              <Card.Text>{renderRawTeams(rawTeams)}</Card.Text>
              <Pagination>{renderPagination(rawTeams)}</Pagination>
            </Card.Body>
          </OverviewCard>
        </Row>
        <Row></Row>
      </Container>
    </div>
  );
};

export default Overview;

const OverviewCard = styled(Card)`
  margin-top: 1rem;
  width: 100%;
`;
