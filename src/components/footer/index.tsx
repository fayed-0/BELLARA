import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../header/source/img1.png';
import footerBg from './source/footer.png';

interface FooterLink { label: string; href: string; }

const navLinks: FooterLink[] = [
  { label: 'Collections', href: '/collection' },
  { label: 'Tranding', href: '#' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Partnership', href: '#' },
];

const social: { label: string; icon: JSX.Element; href: string }[] = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    )
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M13.5 2h3.1c.1 1.2.6 2.2 1.3 3 .8.9 1.8 1.4 3 1.5v3.2c-1.7-.1-3.3-.7-4.5-1.6v6.9a6.9 6.9 0 1 1-6.9-6.9c.3 0 .7 0 1 .1v3.4a3.5 3.5 0 1 0 2.4 3.3L13.5 2Z" />
      </svg>
    )
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4Z" />
      </svg>
    )
  },
  {
    label: 'Gmail',
    href: 'mailto:info@bellara.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <path d="M22 6 12 13 2 6" />
      </svg>
    )
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full font-inter bg-white dark:bg-zinc-950 transition-colors">
      {/* Panel atas abu-abu dengan logo */}
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-20">
        <div
          className="relative bg-zinc-200 dark:bg-zinc-950 rounded-[20px] mt-8 md:mt-14 h-[360px] md:h-[420px] flex items-center justify-center overflow-hidden transition-colors"
          style={{
            backgroundImage: `url(${footerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay aktif sesuai permintaan */}
          <div className="absolute inset-0 bg-black/15 dark:bg-black/20 pointer-events-none" aria-hidden />
          <div className="flex flex-col items-center gap-10 relative z-10">
            <img
              src={logo}
              alt="Bellara Logo"
              className="w-60 h-60 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain opacity-100 transition-transform"
            />
          </div>
        </div>
      </div>
      {/* Area coklat utama */}
      <div className="mt-[-120px] pt-[120px] pb-12 bg-[#4e3527] dark:bg-zinc-950 text-white transition-colors">
        <div className="max-w-[1512px] mx-auto px-5 md:px-12">
          {/* Mobile accordion layout */}
          <div className="md:hidden">
            {/* Brand + short tagline */}
            <div className="flex items-center gap-4 mb-5">
              <img src={logo} alt="Bellara" className="w-14 h-14 object-contain" />
              <p className="text-xs leading-snug text-white/75 max-w-[200px]">Curated bags & timeless accessories.</p>
            </div>
            <div className="divide-y divide-white/10 border-t border-b border-white/10 text-sm">
              {/* Menu Section */}
              <AccordionRow title="Menu">
                <ul className="grid grid-cols-2 gap-y-2 pt-3 pr-2">
                  {navLinks.map(l => (
                    <li key={l.label} className="pr-2">
                      {l.href.startsWith('/') ? (
                        <Link to={l.href} className="hover:text-white/90 transition" aria-label={l.label}>{l.label}</Link>
                      ) : (
                        <a href={l.href} className="hover:text-white/90 transition" aria-label={l.label}>{l.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionRow>
              {/* Social Section */}
              <AccordionRow title="Social">
                <div className="flex items-center gap-3 flex-wrap pt-3">
                  {social.map(s => {
                    const external = !s.href.startsWith('mailto:');
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition border border-white/10"
                      >
                        {s.icon}
                      </a>
                    );
                  })}
                </div>
              </AccordionRow>
              {/* Newsletter Section */}
              <AccordionRow title="Newsletter">
                <div className="pt-3 space-y-3">
                  <p className="text-xs text-white/65 leading-relaxed">Get product updates & drops.</p>
                  <form onSubmit={(e)=>{e.preventDefault();}} className="flex items-center gap-2">
                    <input type="email" required placeholder="Email" className="flex-1 h-9 rounded-md bg-white/10 placeholder:text-white/40 text-[13px] px-3 outline-none focus:ring-2 focus:ring-white/30" />
                    <button className="h-9 px-3 rounded-md bg-white text-neutral-900 text-xs font-medium tracking-wide active:scale-[.96]">OK</button>
                  </form>
                </div>
              </AccordionRow>
            </div>
            {/* Shipping Row */}
            <button className="w-full flex items-center justify-between mt-6 py-3 px-1 text-xs tracking-wide border-t border-white/10 text-white/70">
              <span>Ship to : Indonesia</span>
              <span className="text-white/60">›</span>
            </button>
            {/* Copyright condensed */}
            <div className="mt-6 flex flex-col items-center gap-2 text-center">
              <p className="text-[11px] tracking-wide text-white/55">&copy; {new Date().getFullYear()} Bellara</p>
              <div className="flex gap-4 text-[10px] text-white/55">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Cookies</a>
              </div>
            </div>
          </div>
          {/* Desktop / tablet minimalist layout (mirroring mobile sections without accordion) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-12 lg:gap-16 mt-10">
              {/* Brand + tagline */}
              <div className="col-span-4 lg:col-span-3 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img src={logo} alt="Bellara" className="w-16 h-16 object-contain" />
                  <p className="text-xs leading-snug text-white/75 max-w-[160px]">Curated bags & timeless accessories.</p>
                </div>
                {/* Shipping pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[12px] tracking-wide text-white/80 w-fit">
                  <span className="font-medium">Ship to:</span>
                  <span className="text-white/90">Indonesia</span>
                </div>
              </div>
              {/* Menu */}
              <div className="col-span-2 lg:col-span-2 order-2">
                <h3 className="text-sm font-semibold tracking-wide mb-5 text-white/90">MENU</h3>
                <ul className="grid gap-3 text-sm font-be-vietnam-pro">
                  {navLinks.map(l => (
                    <li key={l.label}>
                      {l.href.startsWith('/') ? (
                        <Link to={l.href} className="hover:text-white transition text-white/75" aria-label={l.label}>{l.label}</Link>
                      ) : (
                        <a href={l.href} className="hover:text-white transition text-white/75" aria-label={l.label}>{l.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Social */}
              <div className="col-span-3 lg:col-span-4 flex flex-col gap-5 order-3">
                <h3 className="text-sm font-semibold tracking-wide text-white/90">SOCIAL</h3>
                <div className="flex items-center gap-4 flex-wrap">
                  {social.map(s => {
                    const external = !s.href.startsWith('mailto:');
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition border border-white/10"
                      >
                        {s.icon}
                      </a>
                    );
                  })}
                </div>
              </div>
              {/* Newsletter (moved to far right) */}
              <div className="col-span-3 lg:col-span-3 flex flex-col gap-5 order-4">
                <h3 className="text-sm font-semibold tracking-wide text-white/90">NEWSLETTER</h3>
                <p className="text-xs text-white/60 leading-relaxed max-w-xs">Get product updates & new drops directly to your inbox.</p>
                <form onSubmit={(e)=>{e.preventDefault();}} className="flex items-center gap-2 w-full max-w-xs">
                  <input type="email" required placeholder="Email" className="flex-1 h-10 rounded-md bg-white/10 placeholder:text-white/40 text-[13px] px-3 outline-none focus:ring-2 focus:ring-white/30" />
                  <button className="h-10 px-4 rounded-md bg-white text-neutral-900 text-xs font-medium tracking-wide active:scale-[.96]">JOIN</button>
                </form>
              </div>
            </div>
            {/* Divider + legal */}
            <div className="mt-14 pt-6 border-t border-white/10 text-[11px] text-white/55 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <p className="tracking-wide">&copy; {new Date().getFullYear()} Bellara</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Simple accordion row (mobile only)
interface AccordionRowProps { title: string; children: React.ReactNode; }
const AccordionRow: React.FC<AccordionRowProps> = ({ title, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o=>!o)}
        className="w-full flex items-center justify-between py-4 text-left font-medium tracking-wide"
        aria-expanded={open}
      >
        <span>{title.toUpperCase()}</span>
        <span className={`transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};