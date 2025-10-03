// Clean implementation only
import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import heroBg from './source/background.jpeg';
import ThemeToggle from './ThemeToggle';

interface NavLink { label: string; href: string; }
interface HeaderProps { sticky?: boolean; }

const navLinks: NavLink[] = [
  { label: 'Collections', href: '/collection' },
  { label: 'Trending', href: '/trending' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Partnership', href: '/partnership' },
];

// Default sekarang non-sticky kecuali diminta
const Header: React.FC<HeaderProps> = ({ sticky = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchId = useId();

  return (
  <header className={`${sticky ? 'sticky top-0 z-40' : ''} w-full bg-white dark:bg-zinc-900 transition-colors`}>
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-20">
        <div
          className="mt-3 mb-6 md:mt-6 md:mb-10 panel-surface relative overflow-hidden"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay untuk memastikan teks tetap terbaca (adjusted dark opacity) */}
          <div className="absolute inset-0 bg-white/15 dark:bg-black/20 pointer-events-none" aria-hidden />
          <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16 pt-4 md:pt-6 flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white rounded-xl">
                          {/* Logo swap: img1 for light, img2 (white) for dark */}
                          <span className="relative w-24 sm:w-24 h-12 sm:h-14 p-1 flex items-center justify-center">
                            <img
                              className="w-full h-full object-contain group-hover:scale-[1.02] transition dark:hidden"
                              src={require('./source/img1.png')}
                              alt="Bellara Logo"
                              loading="lazy"
                              decoding="async"
                            />
                            <img
                              className="w-full h-full object-contain group-hover:scale-[1.02] transition hidden dark:block"
                              src={require('./source/img2.png')}
                              alt="Bellara Logo"
                              loading="lazy"
                              decoding="async"
                            />
                          </span>
                          <span className="sr-only">Bellara Home</span>
                        </Link>
            <nav className="hidden lg:flex items-center gap-6 xl:gap-12 ml-4" aria-label="Primary">
              {navLinks.map(link => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="relative font-be-vietnam-pro text-[15px] xl:text-lg font-medium text-neutral-700/90 dark:text-zinc-300 tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white rounded-md py-2 px-1 before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-neutral-800 dark:before:bg-white before:transition-all hover:text-neutral-900 dark:hover:text-white hover:before:w-8"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative font-be-vietnam-pro text-[15px] xl:text-lg font-medium text-neutral-700/90 dark:text-zinc-300 tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white rounded-md py-2 px-1 before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-neutral-800 dark:before:bg-white before:transition-all hover:text-neutral-900 dark:hover:text-white hover:before:w-8"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </nav>
            <form
              role="search"
              className="hidden md:flex ml-auto w-full max-w-xs xl:max-w-sm relative group"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <label htmlFor={searchId} className="sr-only">Search products</label>
              <input
                id={searchId}
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search..."
                className="peer w-full h-11 rounded-full bg-white/70 dark:bg-zinc-800/70 border border-zinc-300/70 dark:border-zinc-600 focus:border-neutral-700 dark:focus:border-white px-5 pr-12 text-sm font-be-vietnam-pro text-neutral-700 dark:text-zinc-200 placeholder:text-neutral-400 dark:placeholder:text-zinc-400 outline-none shadow-sm focus:ring-2 focus:ring-neutral-800/40 dark:focus:ring-white/30 transition"
              />
              <button
                aria-label="Search"
                className="absolute right-1.5 top-1.5 w-8 h-8 rounded-full bg-neutral-800 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center hover:bg-neutral-900 dark:hover:bg-zinc-200 active:scale-95 transition shadow group-focus-within:scale-[1.02]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-4.35-4.35"/><circle cx="10.5" cy="10.5" r="8.5"/></svg>
              </button>
            </form>
            <div className="hidden md:flex ml-3"><ThemeToggle /></div>
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={()=>setMenuOpen(o=>!o)}
                className="relative z-10 w-11 h-11 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex flex-col items-center justify-center gap-[5px] active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white"
              >
                <span className={`w-6 h-0.5 bg-current rounded-full transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`w-6 h-0.5 bg-current rounded-full transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-6 h-0.5 bg-current rounded-full transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
              </button>
            </div>
          </div>
          <div
            className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-400 ease-out ${menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} px-4 sm:px-6 lg:px-10 xl:px-16`}
          >
            <div className="overflow-hidden">
              <div className="pb-6 pt-2">
                <form
                  role="search"
                  onSubmit={(e)=>{e.preventDefault(); setMenuOpen(false);}}
                  className="mb-5 relative"
                >
                  <label htmlFor={`${searchId}-m`} className="sr-only">Search products</label>
                  <input
                    id={`${searchId}-m`}
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full h-11 rounded-xl bg-white/80 dark:bg-zinc-800/70 border border-zinc-300 dark:border-zinc-600 focus:border-neutral-700 dark:focus:border-white px-4 pr-11 text-sm font-be-vietnam-pro text-neutral-700 dark:text-zinc-200 placeholder:text-neutral-400 dark:placeholder:text-zinc-400 outline-none shadow focus:ring-2 focus:ring-neutral-800/30 dark:focus:ring-white/20 transition"
                  />
                  <button
                    aria-label="Search"
                    className="absolute right-1 top-1 w-9 h-9 rounded-lg bg-neutral-800 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center hover:bg-neutral-900 dark:hover:bg-zinc-200 active:scale-95 transition"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-4.35-4.35"/><circle cx="10.5" cy="10.5" r="8.5"/></svg>
                  </button>
                </form>
                <nav aria-label="Mobile Primary" className="flex flex-col gap-2">
                  {navLinks.map(link => (
                    link.href.startsWith('/') ? (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={()=>setMenuOpen(false)}
                        className="group relative px-5 py-3 rounded-xl bg-white/70 dark:bg-zinc-800/70 hover:bg-white/90 dark:hover:bg-zinc-700 active:scale-[.98] font-be-vietnam-pro font-medium text-[15px] text-neutral-800 dark:text-zinc-200 shadow-sm backdrop-blur border border-zinc-200 dark:border-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white transition"
                      >
                        {link.label}
                        <span className="absolute inset-y-0 right-4 m-auto w-0.5 h-0.5 rounded-full bg-neutral-400 dark:bg-zinc-500 group-hover:scale-150 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={()=>setMenuOpen(false)}
                        className="group relative px-5 py-3 rounded-xl bg-white/70 dark:bg-zinc-800/70 hover:bg-white/90 dark:hover:bg-zinc-700 active:scale-[.98] font-be-vietnam-pro font-medium text-[15px] text-neutral-800 dark:text-zinc-200 shadow-sm backdrop-blur border border-zinc-200 dark:border-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white transition"
                      >
                        {link.label}
                        <span className="absolute inset-y-0 right-4 m-auto w-0.5 h-0.5 rounded-full bg-neutral-400 dark:bg-zinc-500 group-hover:scale-150 transition-transform" />
                      </a>
                    )
                  ))}
                </nav>
                {/* Mobile Theme Toggle */}
                <div className="mt-6 flex items-center justify-between px-2">
                  <span className="text-sm font-medium text-neutral-700 dark:text-zinc-300"></span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
          {/* Hero / extended panel area (mewarisi background dari panel) */}
          <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16 pt-6 md:pt-14 pb-16 md:pb-48 xl:pb-50">
            {/* Mobile height shortened: reduced padding + lower min-height */}
            <div className="grid gap-6 xl:gap-16 items-center min-h-[300px] md:min-h-[550px]">
              {/* Content area (visual panel removed; parent panel can receive a background image via inline style or utility) */}
              <div className="max-w-3xl">
                <h1 className="heading-1 text-neutral-800 dark:text-white leading-[1.05] mb-8">
                  Stay Stylish with the Latest Bag Trends
                </h1>
                <p className="body-text text-neutral-700 dark:text-zinc-300 max-w-[640px] mb-10 hidden md:block">
                  Discover timeless designs crafted with precision, made to elevate your style and confidence. Each bag blends elegance and functionality, designed to accompany you from everyday moments to life’s most memorable occasions
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <button className="btn-primary px-5 py-2 md:px-10 md:py-3 text-sm md:text-base">
                    <span className="btn-primary__gradient" />
                    <span className="relative z-10">Contact Us</span>
                  </button>
                  <a href="#" className="text-neutral-700 dark:text-zinc-200 font-inter text-sm font-medium underline underline-offset-4 hover:text-neutral-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white rounded">
                    Learn more
                  </a>
                </div>
              </div>
              {/* (Removed visual space panel) */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;