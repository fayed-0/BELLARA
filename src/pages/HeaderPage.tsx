import React from 'react';
import Header from '../components/header';

// Halaman khusus hanya menampilkan Header seperti "popup" style section penuh
const HeaderPage: React.FC = () => {
  return (
    <div className="font-inter min-h-screen bg-white dark:bg-zinc-950">
      <Header sticky={false} />
    </div>
  );
};

export default HeaderPage;
