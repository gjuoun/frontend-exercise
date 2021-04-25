import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Team from "./Team";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import PublicRoute from "@components/Route/PublicRoute";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const team = {
  id: "7676a4bf-adfe-415c-941b-1739af07039b",
  name: "Ordinary Coral Lynx",
};

beforeEach(() => {
  render(
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <PublicRoute path="/team/:teamId">
            <Team></Team>
          </PublicRoute>
          <Redirect to={`/team/${team.id}`}></Redirect>
        </Router>
      </QueryClientProvider>
    </ReduxProvider>
  );
});

describe("Test Team", () => {
  test("should render correctly", async () => {
    const els = await screen.findAllByText(team.name, undefined, {
      timeout: 3000,
    });
    expect(els.length).toBeGreaterThan(0);

    const searchField = screen.getByPlaceholderText(
      "search member"
    ) as HTMLInputElement;
    expect(searchField).toBeInTheDocument();

    // using waitfor to avoid the “not wrapped in act” error:
    await waitFor(
      () => {
        fireEvent.change(searchField, { target: { value: "member name" } });
        expect(searchField.value).toBe("member name");
      },
      { timeout: 3000 }
    );
  });
});
