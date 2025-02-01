import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import FlightDetails from "../components/FlightDetails";

jest.mock("axios");
jest.mock("react-router", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("moment-timezone", () => {
  return () => ({
    format: () => "2024-02-01 10:00",
  });
});

describe("FlightDetails Component", () => {
  const mockNavigate = jest.fn();
  const mockFlightData = {
    flightNumber: "FL123",
    airline: "Test Airlines",
    origin: "NYC",
    destination: "LAX",
    departureTime: "2024-02-01T10:00:00Z",
    status: "On Time",
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
  });

  it("should show a loading spinner initially", () => {
    (axios.get as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {})
    );

    render(<FlightDetails />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should display error page when there is an error fetching flight details", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    render(<FlightDetails />);

    await waitFor(() => {
      expect(screen.getByTestId("error-container")).toBeVisible();
    });
  });

  it("should display flight details when fetched successfully", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockFlightData });

    render(<FlightDetails />);

    await waitFor(() => {
      expect(screen.getByText("FL123")).toBeInTheDocument();
    });
  });

  it("should navigate back to the home page when the Go Back button is clicked", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockFlightData });

    render(<FlightDetails />);

    await waitFor(() => {
      expect(screen.getByText("FL123")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("← Go Back"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should display 'Flight not found' when flight data is not available", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "999" });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: null });

    render(<FlightDetails />);

    await waitFor(() => {
      expect(screen.getByText("Flight not found.")).toBeInTheDocument();
    });
  });
});
