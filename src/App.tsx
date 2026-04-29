import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AshaSetuPage } from './pages/AshaSetuPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ashasetu" element={<AshaSetuPage />} />
      </Routes>
    </Router>
  );
}
