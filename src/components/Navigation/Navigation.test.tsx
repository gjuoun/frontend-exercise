import { render, screen } from "@testing-library/react";
import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(() => {
  render(
    <Router>
      <Navigation></Navigation>
    </Router>
  );
});

describe("Test Navigation", () => {
  test("should show My Teams as Logo", () => {
    const title = screen.getByText("My Teams");
    expect(title).toBeTruthy();
    expect(title?.textContent).toMatch("My Teams");
  });

  test("should show navigate to home", () => {
    const title = screen.getByText("Teams");
    expect(title).toHaveAttribute("href");
    expect(title.getAttribute("href")).toBe("/");
  });
});
