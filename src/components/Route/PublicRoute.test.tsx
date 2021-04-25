import { render, screen } from "@testing-library/react";
import React from "react";
import PublicRoute from "./PublicRoute";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(() => {
  render(
    <Router>
      <PublicRoute path="/">
        <div>Something</div>
      </PublicRoute>
    </Router>
  );
});

describe("Test PublicRoute", () => {
  test("should render correctly", () => {
    const divEl = screen.getByText("Something");
    expect(divEl).toBeTruthy();
    expect(divEl.localName).toBe("div");
    expect(divEl.textContent).toBe("Something");
  });
});
