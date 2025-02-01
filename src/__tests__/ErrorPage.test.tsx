import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router";
import ErrorPage from "../components/ErrorPage";

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("ErrorPage Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should display "Oops! Something Went Wrong" message when type is "error"', () => {
    render(<ErrorPage type="error" />);

    expect(screen.getByText("Oops! Something Went Wrong")).toBeInTheDocument();
    expect(screen.getByText("We’re sorry, but an unexpected error has occurred.")).toBeInTheDocument();
  });

  it('should display "Page Not Found" message when type is "not-found"', () => {
    render(<ErrorPage type="not-found" />);

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it('should navigate to homepage when "Go to Homepage" button is clicked', () => {
    render(<ErrorPage type="error" />);

    fireEvent.click(screen.getByText("Go to Homepage"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
