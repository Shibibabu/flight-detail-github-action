import React, { useEffect, useState } from "react";
import { Flight } from "../types/Flight";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import "./styles/FlightDetails.css";
import moment from "moment-timezone";
import Spinner from "./Spinner";
import ErrorPage from "./ErrorPage";

const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(
          `https://flight-status-mock.core.travelopia.cloud/flights/${id}`
        );
        setFlight(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch flight details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorPage type="error" />;
  if (!flight) return <div>Flight not found.</div>;

  return (
    <div className="flight-details-wrapper">
      <div className="back-button">
        <button onClick={() => navigate("/")}>← Go Back</button>
      </div>

      <div className="flight-details-container">
        <div className="flight-header">
          <h1>Flight Details.</h1>
        </div>
        <div className="flight-info">
          <div className="flight-info-item">
            <span className="label">Flight Number:</span>
            <span>{flight.flightNumber}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Airline:</span>
            <span>{flight.airline}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Origin:</span>
            <span>{flight.origin}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Destination:</span>
            <span>{flight.destination}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Departure Time:</span>
            <span>
              {moment(flight.departureTime).format("YYYY-MM-DD HH:mm")}
            </span>
          </div>
          <div className="flight-info-item">
            <span className="label">Status:</span>
            <span>{flight.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
