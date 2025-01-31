import React from "react";
import "./styles/Spinner.css"; // Import CSS for styling

const Spinner: React.FC = () => {
  return (
    <div id="spinner" data-testid="spinner" className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
