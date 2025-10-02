import React from 'react';
import testi1 from './source/testi1.png';
import testi2 from './source/testi2.png';

// Data dummy testimonial
interface TestItem { id: number; name: string; text: string; rating: number; img: string; }
const items: TestItem[] = [
  {
    id: 1,
    name: 'Ari K.',
    rating: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus ipsum in eros vestibulum, nec tincidunt elit cursus.',
    img: testi1
  },
  {
    id: 2,
    name: 'Dina L.',
    rating: 4,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus ipsum in eros vestibulum, nec tincidunt elit cursus.',
    img: testi2
  }
];

const HEADING = 'Lorem ipsum dolor sit amet.';
const SUB = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus ipsum in eros vestibulum, nec tincidunt elit cursus.';

const Testimonial: React.FC = () => {
  return (
    <section className="w-full font-inter bg-white dark:bg-zinc-950 py-16 md:py-24 transition-colors">
      <div className="max-w-[1512px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="mx-auto text-center max-w-[834px] mb-16 md:mb-24">
          <h2 className="heading-2 text-black dark:text-white mb-8 transition-colors">{HEADING}</h2>
          <p className="body-text text-black dark:text-zinc-300 transition-colors">{SUB}</p>
        </div>
        {/* Cards wrapper matched to menu width (1272px) */}
        <div className="mx-auto max-w-[1272px]">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CardProps { item: TestItem; className?: string; }
const Card: React.FC<CardProps> = ({ item, className = '' }) => {
  return (
  <div className={`relative w-full h-72 md:h-64 bg-[#5F402C] dark:bg-[#5F402C] rounded-[18px] overflow-hidden p-5 md:p-6 flex flex-col transition-colors ${className}`}>
      {/* Avatar & header */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30 bg-white/10 flex items-center justify-center transition-colors">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 pt-2">
          <h3 className="heading-3 text-white font-inter font-semibold mb-1 leading-snug text-balance">{item.name}</h3>
          <Rating value={item.rating} />
        </div>
      </div>
      <p className="body-text text-white/90 font-inter leading-relaxed text-balance">{item.text}</p>
    </div>
  );
};

const Rating: React.FC<{ value: number; max?: number }> = ({ value, max = 5 }) => {
  return (
    <div className="flex items-center gap-1 text-zinc-200 dark:text-zinc-300">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} filled={i < value} />
      ))}
    </div>
  );
};

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 2}
    className={`transition ${filled ? 'text-zinc-200 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-400'}`}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default Testimonial;