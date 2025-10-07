import React, { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '../../footer';
// Luna assets (B1 set)
import imgBlack from './source/b1/b1-black.png';
import imgBrown from './source/b1/b1-brown.png';
import imgCream from './source/b1/b1-cream.png';
// Phoebe assets
import phoebeBlack from './source/phoebe/hitam.png';
import phoebeBrown from './source/phoebe/coklat.png';
import phoebeWhite from './source/phoebe/putih.png';
import cartIcon from './source/cart.svg';

// Data for all cards (each card reuses the image variants carousel)
interface CardData { id: number; title: string; price: number }
// Top row (first 3): Luna Series, Bottom row (last 3): Phoebe Series
const CARDS: CardData[] = [
  { id: 1, title: 'Luna Series', price: 75000 },
  { id: 2, title: 'Luna Series', price: 75000 },
  { id: 3, title: 'Luna Series', price: 75000 },
  { id: 4, title: 'Phoebe Series', price: 75000 },
  { id: 5, title: 'Phoebe Series', price: 75000 },
  { id: 6, title: 'Phoebe Series', price: 75000 },
];
  const formatIDR = (value: number) => new Intl.NumberFormat('id-ID').format(value);

interface SliderImage { src: string; alt: string }
// Luna order (default): black, brown, white(cream)
const LUNA_IMAGES: SliderImage[] = [
  { src: imgBlack, alt: 'Luna bag - black' },
  { src: imgBrown, alt: 'Luna bag - brown' },
  { src: imgCream, alt: 'Luna bag - white' },
];
// Phoebe order requested: black, brown, white
const PHOEBE_IMAGES: SliderImage[] = [
  { src: phoebeBlack, alt: 'Phoebe bag - black' },
  { src: phoebeBrown, alt: 'Phoebe bag - brown' },
  { src: phoebeWhite, alt: 'Phoebe bag - white' },
];

interface CarouselCardProps { title: string; price: number; images: SliderImage[]; initialIndex?: number }
const CarouselCard: React.FC<CarouselCardProps> = ({ title, price, images, initialIndex = 0 }) => {
  // For seamless infinite: create virtual slides with clones at start & end
  const [position, setPosition] = useState(initialIndex + 1); // index in extended track (1..length)
  const [animating, setAnimating] = useState(false); // whether CSS transition is active
  const length = images.length;
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
    <div className="group relative rounded-[20px] bg-[#e2d3ba] dark:bg-[#e2d3ba]/100 h-[420px] sm:h-[480px] md:h-[513px] p-5 flex flex-col overflow-hidden">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm md:text-base font-medium font-be-vietnam-pro text-neutral-900 dark:text-dark">{title}</p>
          <p className="text-xl md:text-2xl font-semibold font-be-vietnam-pro text-neutral-900 dark:text-dark mt-1">Rp {formatIDR(price)}</p>
        </div>
        <button
          type="button"
          aria-label="Add to cart"
          className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition active:scale-95 hover:shadow"
          // Hard-coded style so dark mode cannot override
          style={{ background: '#FFFFFF', border: '1px solid #d4d4d8' }}
          onClick={() => {/* future cart logic */}}
          data-theme-fixed="cart"
        >
          <img src={cartIcon} alt="Cart" className="w-7 h-7" style={{ filter: 'none' }} />
        </button>
      </div>
      <div
        className="relative mt-4 rounded-[20px] bg-[##e2d3ba] flex-1 overflow-hidden"
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
            <img src={images[length - 1].src} alt={images[length - 1].alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
          </div>
          {images.map(img => (
            <div key={img.src} className="min-w-full h-full flex items-center justify-center p-6">
              <img src={img.src} alt={img.alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
            </div>
          ))}
          {/* Trailing clone (first real) */}
          <div className="min-w-full h-full flex items-center justify-center p-6">
            <img src={images[0].src} alt={images[0].alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
          </div>
        </div>
        {/* Arrows (desktop/tablet) */}
        <button onClick={()=>go(-1)} aria-label="Previous image" className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 px-1 text-black hover:text-black">
          <span className="text-2xl leading-none select-none">‹</span>
        </button>
        <button onClick={()=>go(1)} aria-label="Next image" className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 px-1 text-black hover:text-black">
          <span className="text-2xl leading-none select-none">›</span>
        </button>
        {/* Progress indicator (hover only) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-5 left-1/2 -translate-x-1/2 w-28 max-w-[60%]">
          <div className="relative h-[2px] bg-black/30 rounded overflow-hidden">
            <span
              className="absolute top-0 h-full bg-black rounded transition-all duration-400 ease-out"
              style={{ width: `${100 / images.length}%`, left: `${(100 / images.length) * logicalIndex}%` }}
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
      <main className="flex-1">
        <section id="collection" className="max-w-[1512px] mx-auto px-6 md:px-12 lg:px-[120px] pt-10 md:pt-14 pb-16">
					<h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-black dark:text-white mb-10 md:mb-14">Our Collections</h1>
          <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map(card => {
              const isPhoebe = card.title === 'Phoebe Series';
              const images = isPhoebe ? PHOEBE_IMAGES : LUNA_IMAGES;
              // 2nd column of Phoebe row is card id 5 (ids 4-6 are Phoebe)
              const initialIndex = isPhoebe && card.id === 5 ? 2 : 0; // start with white for column 2 Phoebe
              return (
                <CarouselCard key={card.id} title={card.title} price={card.price} images={images} initialIndex={initialIndex} />
              );
            })}
          </div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Collection;

