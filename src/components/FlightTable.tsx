import React, { useEffect, useState } from "react";
import { Flight } from "../types/Flight";
import axios from "axios";
import { useNavigate } from "react-router";
import moment from "moment-timezone";
import Spinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import "./styles/FlightTable.css";

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/flight/${id}`);
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
      setFlights(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch flight data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "On Time":
        return "status on-time";
      case "Delayed":
        return "status delayed";
      case "Boarding":
        return "status boarding";
      case "Departed":
        return "status departed";
      case "Cancelled":
        return "status cancelled";
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorPage type="error" />;

  return (
    <div className="container">
      <table>
        <thead>
          <tr style={{ cursor: "auto" }}>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr
              key={flight.id}
              onClick={() => handleRowClick(flight.id)}
              className="rows"
              data-testid={`flight-row-${flight.id}`}
            >
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{moment(flight.departureTime).format("YYYY-MM-DD HH:mm")}</td>
              <td className={getStatusClass(flight.status)}>{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
