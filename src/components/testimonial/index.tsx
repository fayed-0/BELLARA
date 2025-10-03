import React, { useRef, useState, useEffect } from 'react';
import testi1 from './source/testi1.png';
import testi2 from './source/testi2.png';

// Data dummy testimonial
interface TestItem { id: number; name: string; text: string; rating: number; img: string; }
const items: TestItem[] = [
  {
    id: 1,
    name: 'Marvela Maeve Solis.',
    rating: 5,
    text: 'The quality exceeded my expectations. The leather feels soft yet durable, and the design is both chic and practical. I’ve been using it daily, and I always get compliments on how elegant it looks.',
    img: testi1
  },
  {
    id: 2,
    name: 'Amara Elara Noelle.',
    rating: 4,
    text: 'Stylish, versatile, and lightweight this bag goes perfectly with my casual and formal outfits. I love how it carries all my essentials without feeling bulky. Truly worth the investment.',
    img: testi2
  }
];

const HEADING = 'What Our Customers Say';
const SUB = 'Real experiences from our customers who’ve found style, comfort, and confidence in every bag.';

const Testimonial: React.FC = () => {
  const { carouselRef, handleScroll, activeIndex, scrollToIndex, showHint } = useCarouselProgress();
  return (
    <section className="w-full font-inter bg-white dark:bg-zinc-900 py-16 md:py-24 transition-colors">
      <div className="max-w-[1512px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="mx-auto text-center max-w-[834px] mb-16 md:mb-24">
          <h2 className="heading-2 text-black dark:text-white mb-8 transition-colors">{HEADING}</h2>
          <p className="body-text text-black dark:text-zinc-300 transition-colors">{SUB}</p>
        </div>
        {/* Cards wrapper matched to menu width (1272px) */}
        <div className="mx-auto max-w-[1272px]">
          {/* Mobile carousel (single card, swipe) */}
          <div className="md:hidden -mx-4 px-4" aria-label="Testimonial carousel">
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4 pr-4"
            >
              {items.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  className="snap-center shrink-0 w-[86%] first:ml-0"
                />
              ))}
              {/* Peek spacer to ensure last card centers nicely */}
              <div className="shrink-0 w-[8%]" aria-hidden />
            </div>
            {/* Dots navigation (only indicator now) */}
            <div className="mt-4 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition transform ${i === activeIndex ? 'bg-[#5F402C] dark:bg-white scale-110' : 'bg-neutral-400/40 dark:bg-zinc-600/50 hover:bg-neutral-500/60 dark:hover:bg-zinc-500/70'}`}
                />
              ))}
            </div>
            {/* Swipe hint (auto fades) */}
          </div>
          {/* Desktop / Tablet grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 md:gap-8">
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

// Hook & helpers for carousel indicator
const useCarouselProgress = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3200);
    return () => clearTimeout(t);
  }, []);
  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    // active index calculation based on card width (~86% + gap) -> use elementWidth
    const children = Array.from(el.children).filter(ch => (ch as HTMLElement).tagName !== 'DIV' || !(ch as HTMLElement).classList.contains('carousel-indicator'));
    if (children.length > 0) {
      const cardWidth = (children[0] as HTMLElement).clientWidth;
      const idx = Math.round(el.scrollLeft / (cardWidth + 16)); // 16px gap approximated
      setActiveIndex(Math.min(children.length - 2, Math.max(0, idx))); // exclude spacer
    }
  };
  const scrollToIndex = (i: number) => {
    const el = ref.current; if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) { el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' }); }
  };
  return { carouselRef: ref, handleScroll, activeIndex, scrollToIndex, showHint };
};

// Integrate hook inside component (placed here to avoid reordering large code above)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Dummy() { return null; }