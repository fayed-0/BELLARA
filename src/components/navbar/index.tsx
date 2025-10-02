import React, { useId, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../header/ThemeToggle';
import logo from '../header/source/img1.png';

interface NavItem { label: string; to: string; }
const navItems: NavItem[] = [
	{ label: 'Collections', to: '/collection' },
	{ label: 'Trending', to: '#' },
	{ label: 'Accessories', to: '#' },
	{ label: 'Partnership', to: '#' },
];

// Transparent rounded panel navbar for reuse on collection page.
const Navbar: React.FC = () => {
	const searchId = useId();
	const { pathname } = useLocation();
	const [query, setQuery] = useState('');

	return (
		<div className="w-full font-inter sticky top-0 z-50 px-4 sm:px-6 lg:px-10 xl:px-20">
			<div className="relative overflow-hidden rounded-b-[46px] rounded-t-none sm:rounded-[46px] backdrop-blur supports-[backdrop-filter]:bg-white/35 dark:supports-[backdrop-filter]:bg-zinc-900/35 bg-white/70 dark:bg-zinc-900/70 border border-t-0 sm:border border-white/60 dark:border-white/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)] flex items-center gap-6 px-6 xl:px-12 h-[72px]">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white rounded-xl">
					<img src={logo} alt="Bellara Logo" className="w-24 h-14 object-contain p-1 group-hover:scale-[1.02] transition" />
					<span className="sr-only">Bellara Home</span>
				</Link>
				{/* Desktop nav */}
				<nav className="hidden lg:flex items-center gap-8 xl:gap-12" aria-label="Primary">
					{navItems.map(item => {
						const active = pathname === item.to;
						return (
							<Link
								key={item.label}
								to={item.to}
								className={`relative font-be-vietnam-pro text-[15px] xl:text-lg font-medium tracking-wide py-2 px-1 transition-colors before:absolute before:bottom-0.5 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:bg-neutral-900 dark:before:bg-white before:rounded-full before:transition-all hover:text-neutral-900 dark:hover:text-white ${active ? 'text-neutral-900 dark:text-white before:w-8' : 'text-neutral-700/90 dark:text-zinc-300 before:w-0 hover:before:w-8'}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>
				{/* Search */}
				<form
					role="search"
					onSubmit={(e)=>e.preventDefault()}
					className="hidden md:flex ml-auto w-full max-w-sm xl:max-w-md relative"
				>
					<label htmlFor={searchId} className="sr-only">Search products</label>
						<input
							id={searchId}
							value={query}
							onChange={(e)=>setQuery(e.target.value)}
							placeholder="Search..."
							className="peer w-full h-12 rounded-full bg-white/70 dark:bg-zinc-800/60 border border-zinc-300/70 dark:border-zinc-600 focus:border-neutral-700 dark:focus:border-white px-5 pr-14 text-sm font-be-vietnam-pro text-neutral-700 dark:text-zinc-200 placeholder:text-neutral-400 dark:placeholder:text-zinc-400 outline-none shadow-sm focus:ring-2 focus:ring-neutral-800/30 dark:focus:ring-white/25 transition"
						/>
						<button
							aria-label="Search"
							className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center hover:bg-neutral-800 dark:hover:bg-zinc-200 active:scale-95 transition shadow"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-4.35-4.35"/><circle cx="10.5" cy="10.5" r="8.5"/></svg>
						</button>
				</form>
				<div className="hidden md:flex ml-3"><ThemeToggle /></div>
			</div>
		</div>
	);
};

export default Navbar;
