import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Navbar from '../navbar';

// Shared layout: navbar at top + page content below
const AppLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 font-inter">
      <ScrollToTop />
      {!isHome && <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
