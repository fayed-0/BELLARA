import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import HeaderPage from './pages/HeaderPage';
import Collection from './components/menu/collection';
import Accessories from './components/menu/accessories';
import Partnership from './components/menu/partnership';
import Trending from './components/menu/trending';
import AppLayout from './components/layout/AppLayout';

// App sekarang hanya mendefinisikan route ke page
const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}> 
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<HeaderPage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/trending" element={<Trending />} />
      </Route>
    </Routes>
  );
};

export default App;