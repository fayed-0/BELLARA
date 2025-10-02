import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import HeaderPage from './pages/HeaderPage';

// App sekarang hanya mendefinisikan route ke page
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/header" element={<HeaderPage />} />
    </Routes>
  );
};

export default App;