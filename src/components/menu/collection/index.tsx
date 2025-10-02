import React, { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '../../footer';
import Navbar from '../../navbar';
import imgBlack from './source/b1/b1-black.png';
import imgBrown from './source/b1/b1-brown.png';
import imgCream from './source/b1/b1-cream.png';

// Data for all cards (each card reuses the image variants carousel)
interface CardData { id: number; title: string; price: number }
const CARDS: CardData[] = Array.from({ length: 6 }).map((_, i) => ({ id: i + 1, title: 'B1 Series', price: 54 }));

interface SliderImage { src: string; alt: string }
const SLIDER_IMAGES: SliderImage[] = [
  { src: imgBlack, alt: 'Bag black variant' },
  { src: imgBrown, alt: 'Bag brown variant' },
  { src: imgCream, alt: 'Bag cream variant' },
];

interface CarouselCardProps { title: string; price: number; }
const CarouselCard: React.FC<CarouselCardProps> = ({ title, price }) => {
  // For seamless infinite: create virtual slides with clones at start & end
  const [position, setPosition] = useState(1); // index in extended track (1..length)
  const [animating, setAnimating] = useState(false); // whether CSS transition is active
  const length = SLIDER_IMAGES.length;
  const logicalIndex = (position - 1 + length) % length; // for indicator
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const touchDelta = useRef(0);

  const go = useCallback((dir: 1 | -1) => {
    if (animating) return; // avoid spamming while in motion
    setAnimating(true);
    setPosition(p => p + dir);
  }, [animating]);

  // After transition end, if at clone slide, jump without animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timeout: any;
    const handleEnd = () => {
      setAnimating(false);
      setPosition(p => {
        if (p === 0) return length; // wrapped backward
        if (p === length + 1) return 1; // wrapped forward
        return p;
      });
    };
    // Fallback: if transitionend not fired (tab hidden, etc.), clear animating
    if (animating) {
      timeout = setTimeout(() => {
        setAnimating(false);
        setPosition(p => {
          if (p === 0) return length;
          if (p === length + 1) return 1;
          return p;
        });
      }, 800); // a bit longer than transition
    }
    track.addEventListener('transitionend', handleEnd);
    return () => {
      clearTimeout(timeout);
      track.removeEventListener('transitionend', handleEnd);
    };
  }, [length, animating]);

  // Remove transition when performing the silent jump
  // When we instantly jump (position adjusted to 1 or length after hitting clone) we disable transition automatically via animating flag below.
  const translatePercent = -(position * 100);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };
  const onTouchEnd = () => {
    if (touchStart.current != null) {
      if (touchDelta.current > 50) go(-1);
      else if (touchDelta.current < -50) go(1);
    }
    touchStart.current = null;
    touchDelta.current = 0;
  };

  return (
    <div className="group relative rounded-[20px] bg-[#FFF3EB] dark:bg-[#FFF3EB]/90 h-[420px] sm:h-[480px] md:h-[513px] p-5 flex flex-col overflow-hidden">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm md:text-base font-medium font-be-vietnam-pro text-neutral-900 dark:text-white">{title}</p>
          <p className="text-xl md:text-2xl font-semibold font-be-vietnam-pro text-neutral-900 dark:text-white mt-1">${price}</p>
        </div>
        <button
          type="button"
          aria-label="Locked"
          className="w-7 h-7 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm border border-neutral-200/60 dark:border-zinc-700"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900 dark:text-zinc-200"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>
      </div>
      <div
        className="relative mt-4 rounded-[20px] bg-[#FFF3EB] flex-1 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides */}
        <div
          ref={trackRef}
          className="h-full w-full flex will-change-transform"
          style={{
            transform: `translateX(${translatePercent}%)`,
            transition: animating ? 'transform 450ms cubic-bezier(.4,.65,.25,1)' : 'none'
          }}
        >
          {/* Leading clone (last real) */}
          <div className="min-w-full h-full flex items-center justify-center p-6">
            <img src={SLIDER_IMAGES[length - 1].src} alt={SLIDER_IMAGES[length - 1].alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
          </div>
          {SLIDER_IMAGES.map(img => (
            <div key={img.src} className="min-w-full h-full flex items-center justify-center p-6">
              <img src={img.src} alt={img.alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
            </div>
          ))}
          {/* Trailing clone (first real) */}
          <div className="min-w-full h-full flex items-center justify-center p-6">
            <img src={SLIDER_IMAGES[0].src} alt={SLIDER_IMAGES[0].alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
          </div>
        </div>
        {/* Arrows (desktop/tablet) */}
        <button onClick={()=>go(-1)} aria-label="Previous image" className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 px-1 text-neutral-900 dark:text-white/90 hover:text-neutral-700 dark:hover:text-white">
          <span className="text-2xl leading-none select-none">‹</span>
        </button>
        <button onClick={()=>go(1)} aria-label="Next image" className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 px-1 text-neutral-900 dark:text-white/90 hover:text-neutral-700 dark:hover:text-white">
          <span className="text-2xl leading-none select-none">›</span>
        </button>
        {/* Progress indicator (hover only) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-5 left-1/2 -translate-x-1/2 w-28 max-w-[60%]">
          <div className="relative h-[2px] bg-neutral-300/80 dark:bg-white/30 rounded overflow-hidden">
            <span
              className="absolute top-0 h-full bg-neutral-900 dark:bg-white rounded transition-all duration-400 ease-out"
              style={{ width: `${100 / SLIDER_IMAGES.length}%`, left: `${(100 / SLIDER_IMAGES.length) * logicalIndex}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Collection: React.FC = () => {
	return (
		<div className="font-inter flex flex-col min-h-screen bg-white dark:bg-zinc-950 transition-colors">
			<Navbar />
			<main className="flex-1">
				<section id="collection" className="max-w-[1512px] mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-16">
					<h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-black dark:text-white mb-10 md:mb-14">Lorem ipsum dolor sit amet.</h1>
          <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map(card => (
              <CarouselCard key={card.id} title={card.title} price={card.price} />
            ))}
          </div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Collection;

