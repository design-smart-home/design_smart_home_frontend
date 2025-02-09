import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScenarioPage from './pages/ScenarioPage';
import DevicesPage from './pages/DevicesPage'; // Импортируем новую страницу
import NotFound from './pages/NotFound';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/scenarios" element={<ScenarioPage />} /> 
      <Route path="/devices" element={<DevicesPage />} /> 
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  </Router>
);

export default App;