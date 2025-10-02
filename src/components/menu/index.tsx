import React from 'react';
import { useNavigate } from 'react-router-dom';
import trandingImg from './source/tranding.png';
import partnershipImg from './source/partnership.png';
import collectionsImg from './source/collections.png';
import accessoriesImg from './source/accessories.png';



const MOCK_HEADING = 'Stay Stylish with the Latest Bag Trends';
const MOCK_SUB = 'Discover elegant designs made to elevate your style, blending timeless beauty with everyday functionality';

const cards = [
  { title: 'Collections', desc: 'Timeless collections carefully crafted to elevate everyday elegance and personal style', wide: true },
  { title: 'Tranding', desc: 'Modern styles designed to keep your fashion fresh, unique, and always on point', wide: false },
  { title: 'Accessories', desc: 'Essential accessories with refined details to complete and enhance your perfect look', wide: false },
  { title: 'Partnership', desc: 'Building strong connections through shared passion for fashion, style, and timeless design', wide: true },
];

const Menu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full font-inter bg-white dark:bg-zinc-900 py-10 md:py-20 transition-colors">
      {/* Wrapper lebar desain 1512px */}
      <div className="max-w-[1512px] mx-auto px-4 md:px-8">
        {/* Heading block */}
        <div className="mx-auto text-center max-w-[834px] mb-16 md:mb-24">
          <h2 className="heading-2 text-black dark:text-white mb-6 transition-colors">{MOCK_HEADING}</h2>
          <p className="body-text text-black dark:text-zinc-300 font-normal transition-colors">{MOCK_SUB}</p>
        </div>
  <div className="mx-auto max-w-[1272px] grid grid-cols-12 gap-4 md:gap-10">
          <Card
            {...cards[0]}
            className="col-span-7 md:col-span-7"
            onClick={() => navigate('/collection')}
          />
          <Card {...cards[1]} className="col-span-5 md:col-span-5" />
          <Card {...cards[2]} className="col-span-5 md:col-span-5" />
          <Card {...cards[3]} className="col-span-7 md:col-span-7" />
        </div>
      </div>
    </section>
  );
};

interface CardProps { title: string; desc: string; wide?: boolean; className?: string; onClick?: () => void; }
const imageMap: Record<string,string> = {
  collections: collectionsImg,
  tranding: trandingImg,
  accessories: accessoriesImg,
  partnership: partnershipImg,
};

const Card: React.FC<CardProps> = ({ title, desc, className = '', onClick }) => {
  const key = title.toLowerCase();
  const bg = imageMap[key];
  const hasImage = Boolean(bg);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className={`group relative h-60 sm:h-64 md:h-72 xl:h-80 rounded-[20px] overflow-hidden flex flex-col justify-end p-5 sm:p-6 md:p-8 xl:p-10 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black dark:focus-visible:ring-offset-zinc-900 cursor-pointer ${hasImage ? '' : 'bg-zinc-500 dark:bg-zinc-700'} ${className}`}
    >
      {hasImage && (
        <>
          <div
            className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/15 dark:bg-black/20 group-hover:bg-black/25 dark:group-hover:bg-black/30 transition-colors" aria-hidden />
        </>
      )}
      <div className="relative max-w-[600px]">
        <h3 className="heading-3 text-white font-be-vietnam-pro font-medium mb-3 tracking-tight">{title}</h3>
        <p className="body-text text-white/90 font-be-vietnam-pro leading-relaxed hidden md:block">{desc}</p>
      </div>
    </button>
  );
};

export default Menu;