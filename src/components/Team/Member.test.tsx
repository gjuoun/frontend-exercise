import { render, screen } from "@testing-library/react";
import React from "react";
import Member from "./Member";
import { BrowserRouter as Router } from "react-router-dom";
import { User } from "@type/team.type";

const members: User[] = [
  {
    firstName: "Jun",
    lastName: "Guo",
    avatarUrl: "avatarLink",
    displayName: "gjuoun",
    id: "junid",
    location: "Canada",
    role: "Member",
  },
];

describe("Test Member", () => {
  test("should render correctly", () => {
    const member = members[0];
    const { container, getByText } = render(
      <Member member={member} role={member.role}></Member>
    );

    expect(
      getByText(`${member.firstName} ${member.lastName}`)
    ).toBeInTheDocument();
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      member.avatarUrl
    );
    expect(getByText(member.role)).toBeInTheDocument();
  });
});
