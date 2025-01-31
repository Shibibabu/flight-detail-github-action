/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable testing-library/prefer-find-by */
import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import FlightTable from "../components/FlightTable";
import axios from "axios";
import { BrowserRouter as Router } from "react-router";
import { jest } from "@jest/globals";

const nv = jest.fn();
const mockNavigate = jest.fn((arg1) => {
  return jest.fn();
}); // jest.fn();

const _rec_router = jest.mock("react-router", () =>
  Object.assign({}, jest.requireActual("react-router"), {
    useNavigate: mockNavigate,
  })
);
const mockedAxiosGet = jest.spyOn(axios, "get");

describe("FlightTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    mockNavigate.mockRestore();
    // mockNavigate.mockImplementation(jest.fn());
  });

  const mockFlights = [
    {
      id: "1",
      flightNumber: "ABC123",
      airline: "Airline A",
      origin: "New York",
      destination: "Los Angeles",
      departureTime: "2025-01-30T10:00:00Z",
      status: "On Time",
    },
  ];

  it("renders the flight table correctly", async () => {
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(
      <Router>
        <FlightTable />
      </Router>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("ABC123")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText("Flight Number")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("On Time")).toBeInTheDocument()
    );
  });
  it("renders the flight table correctly - delayed", async () => {
    mockFlights[0].status = "Delayed";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(
      <Router>
        <FlightTable />
      </Router>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("ABC123")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText("Flight Number")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Delayed")).toBeInTheDocument()
    );
  });

  it("renders the flight table correctly - Boarding", async () => {
    mockFlights[0].status = "Boarding";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(
      <Router>
        <FlightTable />
      </Router>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("ABC123")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText("Flight Number")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Boarding")).toBeInTheDocument()
    );
  });

  it("renders the flight table correctly - Departed", async () => {
    mockFlights[0].status = "Departed";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(
      <Router>
        <FlightTable />
      </Router>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("ABC123")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText("Flight Number")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Departed")).toBeInTheDocument()
    );
  });

  it("renders the flight table correctly - Cancelled", async () => {
    mockFlights[0].status = "Cancelled";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(
      <Router>
        <FlightTable />
      </Router>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("ABC123")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText("Flight Number")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Cancelled")).toBeInTheDocument()
    );
  });

  it("displays error message on API failure", async () => {
    mockedAxiosGet.mockRejectedValue(new Error("Network Error"));

    render(
      <Router>
        <FlightTable />
      </Router>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Oops! Something Went Wrong/i)
      ).toBeInTheDocument()
    );
  });
  it("updates flight data every 3 seconds", async () => {
    jest.useFakeTimers();
    mockedAxiosGet.mockResolvedValue({ data: mockFlights });

    render(
      <Router>
        <FlightTable />
      </Router>
    );

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    await waitFor(() => expect(mockedAxiosGet).toHaveBeenCalledTimes(2));
    jest.advanceTimersByTime(3000);
    await waitFor(() => expect(mockedAxiosGet).toHaveBeenCalledTimes(3));
    jest.useRealTimers();
  });
});
