import React, { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '../../footer';
import cartIcon from '../collection/source/cart.svg';

// Import accessory images (three angles per variant)
import blackSide from './source/black-swan/hitam-samping.png';
import blackFront from './source/black-swan/hitam-depan.png';
import blackBack from './source/black-swan/hitam-belakang.png';

import brownSide from './source/bown-swan/coklat-samping.png';
import brownFront from './source/bown-swan/coklat-depan.png';
import brownBack from './source/bown-swan/coklat-belakang.png';

import whiteSide from './source/white-swan/white-samping.png';
import whiteFront from './source/white-swan/white-depan.png';
import whiteBack from './source/white-swan/white-belakang.png';

interface VariantImages { color: string; images: { src: string; alt: string }[] }
const VARIANTS: VariantImages[] = [
	{ color: 'Black Swan', images: [
		{ src: blackSide, alt: 'Black bag side view' },
		{ src: blackFront, alt: 'Black bag front view' },
		{ src: blackBack, alt: 'Black bag back view' },
	]},
	{ color: 'Brown Swan', images: [
		{ src: brownSide, alt: 'Brown bag side view' },
		{ src: brownFront, alt: 'Brown bag front view' },
		{ src: brownBack, alt: 'Brown bag back view' },
	]},
	{ color: 'White Swan', images: [
		{ src: whiteSide, alt: 'White bag side view' },
		{ src: whiteFront, alt: 'White bag front view' },
		{ src: whiteBack, alt: 'White bag back view' },
	]},
];

interface CardData { id: number; title: string; price: number; variant: VariantImages }
const CARDS: CardData[] = Array.from({ length: 6 }).map((_, i) => ({
	id: i + 1,
	title: VARIANTS[i % VARIANTS.length].color + ' Series',
	price: 75000,
	variant: VARIANTS[i % VARIANTS.length]
}));
const formatIDR = (value: number) => new Intl.NumberFormat('id-ID').format(value);

interface CarouselCardProps { data: CardData }
const CarouselCard: React.FC<CarouselCardProps> = ({ data }) => {
	const slides = data.variant.images;
	const length = slides.length;
	const [position, setPosition] = useState(1); // with clones
	const [animating, setAnimating] = useState(false);
	const logicalIndex = (position - 1 + length) % length;
	const trackRef = useRef<HTMLDivElement | null>(null);
	const touchStart = useRef<number | null>(null);
	const touchDelta = useRef(0);

	const go = useCallback((dir: 1 | -1) => {
		if (animating) return;
		setAnimating(true);
		setPosition(p => p + dir);
	}, [animating]);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		let timeout: any;
		const handleEnd = () => {
			setAnimating(false);
			setPosition(p => {
				if (p === 0) return length;
				if (p === length + 1) return 1;
				return p;
			});
		};
		if (animating) {
			timeout = setTimeout(handleEnd, 800);
		}
		track.addEventListener('transitionend', handleEnd);
		return () => {
			clearTimeout(timeout);
			track.removeEventListener('transitionend', handleEnd);
		};
	}, [animating, length]);

	const translatePercent = -(position * 100);

	const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
	const onTouchMove = (e: React.TouchEvent) => { if (touchStart.current!=null) touchDelta.current = e.touches[0].clientX - touchStart.current; };
	const onTouchEnd = () => {
		if (touchStart.current != null) {
			if (touchDelta.current > 50) go(-1); else if (touchDelta.current < -50) go(1);
		}
		touchStart.current = null; touchDelta.current = 0;
	};

	return (
		<div className="group relative rounded-[20px] bg-[#e2d3ba] dark:bg-[#e2d3ba]/100 h-[420px] sm:h-[480px] md:h-[513px] p-5 flex flex-col overflow-hidden">
			<div className="flex items-start justify-between mb-2">
				<div>
					<p className="text-sm md:text-base font-medium font-be-vietnam-pro text-neutral-900 dark:text-dark">{data.title}</p>
					<p className="text-xl md:text-2xl font-semibold font-be-vietnam-pro text-neutral-900 dark:text-dark mt-1">Rp {formatIDR(data.price)}</p>
				</div>
				<button
					type="button"
					aria-label="Add to cart"
					className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition active:scale-95 hover:shadow"
					style={{ background: '#FFFFFF', border: '1px solid #d4d4d8' }}
					onClick={() => {}}
					data-theme-fixed="cart"
				>
					<img src={cartIcon} alt="Cart" className="w-7 h-7" />
				</button>
			</div>
			<div
				className="relative mt-4 rounded-[20px] bg-[#e2d3ba] flex-1 overflow-hidden"
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<div
					ref={trackRef}
						className="h-full w-full flex will-change-transform"
						style={{ transform: `translateX(${translatePercent}%)`, transition: animating ? 'transform 450ms cubic-bezier(.4,.65,.25,1)' : 'none' }}
				>
					<div className="min-w-full h-full flex items-center justify-center p-6">
						<img src={slides[length-1].src} alt={slides[length-1].alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
					</div>
					{slides.map(img => (
						<div key={img.src} className="min-w-full h-full flex items-center justify-center p-6">
							<img src={img.src} alt={img.alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
						</div>
					))}
					<div className="min-w-full h-full flex items-center justify-center p-6">
						<img src={slides[0].src} alt={slides[0].alt} className="max-h-full max-w-full object-contain select-none pointer-events-none" />
					</div>
				</div>
				<button onClick={()=>go(-1)} aria-label="Previous image" className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 px-1 text-black hover:text-black">
					<span className="text-2xl leading-none select-none">‹</span>
				</button>
				<button onClick={()=>go(1)} aria-label="Next image" className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 px-1 text-black hover:text-black">
					<span className="text-2xl leading-none select-none">›</span>
				</button>
				<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-5 left-1/2 -translate-x-1/2 w-28 max-w-[60%]">
					<div className="relative h-[2px] bg-black/30 rounded overflow-hidden">
						<span className="absolute top-0 h-full bg-black rounded transition-all duration-400 ease-out" style={{ width: `${100/length}%`, left: `${(100/length)*logicalIndex}%` }} />
					</div>
				</div>
			</div>
		</div>
	);
};

const Accessories: React.FC = () => {
	return (
		<div className="font-inter flex flex-col min-h-screen bg-white dark:bg-zinc-950 transition-colors">
			<main className="flex-1">
				<section id="accessories" className="max-w-[1512px] mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-16">
					<h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-black dark:text-white mb-10 md:mb-14">Accessories Showcase</h1>
					<div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{CARDS.map(card => (
							<CarouselCard key={card.id} data={card} />
						))}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Accessories;

