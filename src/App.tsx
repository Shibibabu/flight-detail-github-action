import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import FlightDetails from "./components/FlightDetails";
import FlightTable from "./components/FlightTable";
import React from "react";
import ErrorPage from "./components/ErrorPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightTable />} />
        <Route path="/flight/:id" element={<FlightDetails />} />
        <Route path="*" element={<ErrorPage type="page-not-found" />} />
      </Routes>
    </Router>
  );
};

export default App;
