import React from 'react';
import Header from '../components/header';
import Menu from '../components/menu';
import Testimonial from '../components/testimonial';
import Footer from '../components/footer';

// Home page menggabungkan semua section seperti sebelumnya
const Home: React.FC = () => {
  return (
    <div className="font-inter min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Header sticky={false} />
      <div className="flex-1">
        <Menu />
        <main>
          <Testimonial />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
