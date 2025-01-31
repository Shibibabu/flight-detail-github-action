import React from "react";
import { useNavigate } from "react-router";
import "./styles/ErrorPage.css";

interface ErrorPageProps {
  type: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1>
        {type === "error" ? "Oops! Something Went Wrong" : "Page Not Found"}
      </h1>
      {type === "error" && (
        <p>We’re sorry, but an unexpected error has occurred.</p>
      )}
      <button onClick={() => navigate("/")}>Go to Homepage</button>
    </div>
  );
};

export default ErrorPage;
