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
import { useNavigate } from "react-router";

const nv = jest.fn();

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

const mockedAxiosGet = jest.spyOn(axios, "get");

describe("FlightTable Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
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

    render(<FlightTable />);

    expect(screen.getByTestId("spinner")).toBeVisible();
    await screen.findByText("ABC123");
    await screen.findByText("Flight Number");
    await screen.findByText("On Time");
  });
  it("renders the flight table correctly - delayed", async () => {
    mockFlights[0].status = "Delayed";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(<FlightTable />);

    expect(screen.getByTestId("spinner")).toBeVisible();
    await screen.findByText("ABC123");
    await screen.findByText("Flight Number");
    await screen.findByText("Delayed");
  });

  it("renders the flight table correctly - Boarding", async () => {
    mockFlights[0].status = "Boarding";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(<FlightTable />);

    expect(screen.getByTestId("spinner")).toBeVisible();
    await screen.findByText("ABC123");
    await screen.findByText("Flight Number");
    await screen.findByText("Boarding");
  });

  it("renders the flight table correctly - Departed", async () => {
    mockFlights[0].status = "Departed";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(<FlightTable />);

    expect(screen.getByTestId("spinner")).toBeVisible();
    await screen.findByText("ABC123");
    await screen.findByText("Flight Number");
    await screen.findByText("Departed");
  });

  it("renders the flight table correctly - Cancelled", async () => {
    mockFlights[0].status = "Cancelled";
    mockedAxiosGet.mockResolvedValue({
      data: mockFlights,
    });

    render(<FlightTable />);

    expect(screen.getByTestId("spinner")).toBeVisible();
    await screen.findByText("ABC123");
    await screen.findByText("Flight Number");
    await screen.findByText("Cancelled");
  });

  it("displays error message on API failure", async () => {
    mockedAxiosGet.mockRejectedValue(new Error("Network Error"));

    render(<FlightTable />);

    await screen.findByText(/Oops! Something Went Wrong/i);
  });
  it("updates flight data every 3 seconds", async () => {
    jest.useFakeTimers();
    mockedAxiosGet.mockResolvedValue({ data: mockFlights });

    render(<FlightTable />);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    await act(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => expect(mockedAxiosGet).toHaveBeenCalledTimes(2));
    await act(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => expect(mockedAxiosGet).toHaveBeenCalledTimes(3));
  });

  it("should navigate to the correct flight details page when a row is clicked", async () => {
    jest.useFakeTimers();
    mockedAxiosGet.mockResolvedValue({ data: mockFlights });
    render(<FlightTable />);

    await waitFor(() => {
      expect(screen.getByTestId("flight-row-1")).toBeVisible();
    });

    fireEvent.click(screen.getByTestId("flight-row-1"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/flight/1");
  });
});
