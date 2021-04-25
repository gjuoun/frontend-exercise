import { getByText, render, screen } from "@testing-library/react";
import React from "react";
import TeamList from "./TeamList";
import { RawTeam, User } from "@type/team.type";
import { BrowserRouter as Router } from "react-router-dom";

const rawTeams: RawTeam[] = [
  {
    id: "id1",
    name: "team1",
  },
  {
    id: "id2",
    name: "team2",
  },
];

describe("Test TeamList", () => {
  test("should render correctly", () => {
    const { container, getByText } = render(
      <Router>
        <TeamList rawTeams={rawTeams}></TeamList>
      </Router>
    );

    expect(getByText(rawTeams[0].name)).toBeInTheDocument();
    expect(container.querySelector("a")?.getAttribute("href")).toBe(
      `/team/${rawTeams[0].id}`
    );
  });
});
