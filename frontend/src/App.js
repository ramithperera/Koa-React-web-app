import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoursePage from "./pages/Course";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
    </Router>
  );
};

export default App;
