import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PieChartPage from "./components/PieChartPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/piechart" element={<PieChartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
