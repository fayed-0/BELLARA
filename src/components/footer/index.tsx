import React from 'react';
import logo from '../header/source/img1.png';
import footerBg from './source/footer.png';

interface FooterLink { label: string; href: string; }

const navLinks: FooterLink[] = [
  { label: 'Collections', href: '#' },
  { label: 'Tranding', href: '#' },
  { label: 'Accessories', href: '#' },
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
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4Z" />
      </svg>
    )
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18 2h4l-8.5 9.9L23 22h-7l-5-6.6L5 22H1l9-10.5L2 2h7l4.6 6.1L18 2Z" />
      </svg>
    )
  },
  {
    label: 'Pinterest',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.5 2 3 6 3 10.5c0 3.1 1.9 5.7 4.6 6.6.2-.6.5-1.6.6-2.2 0-.2.1-.5.3-.7-1-.2-1.8-1.1-1.8-2.4 0-2 1.5-3.8 4-3.8 2.2 0 3.7 1.3 3.7 3.2 0 2.4-1.1 4.4-2.7 4.4-.9 0-1.6-.7-1.4-1.6.3-1.2.9-2.4.9-3.3 0-.8-.5-1.5-1.4-1.5-1.1 0-2 1.2-2 2.8 0 1 .3 1.6.3 1.6s-1 4.2-1.2 5c-.4 1.5-.1 3.4 0 3.6 0 0 .1 0 .1-.1.5-.7 1.9-2.8 2.2-4.1.2-.8.9-2.9.9-2.9.4.7 1.5 1.3 2.6 1.3 3.4 0 5.7-3 5.7-7.1C21 5.6 17.5 2 12 2Z" />
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
          className="relative bg-zinc-200 dark:bg-zinc-800 rounded-[20px] mt-8 md:mt-14 h-[360px] md:h-[420px] flex items-center justify-center overflow-hidden transition-colors"
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
      <div className="mt-[-120px] pt-[140px] pb-16 bg-[#4e3527] dark:bg-zinc-900 text-white transition-colors">
        <div className="max-w-[1512px] mx-auto px-6 md:px-12">
          <div className="grid gap-12 md:gap-10 lg:gap-16 md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="Bellara" className="w-16 h-16 object-contain" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-200/90 dark:text-zinc-300/90 max-w-xs transition-colors">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus ipsum in eros vestibulum, nec tincidunt elit cursus. Quisque dapibus, nisi id auctor pulvinar, ex est bibendum justo.
              </p>
            </div>
            {/* Home links */}
            <div className="md:col-span-2 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-5">Home</h3>
              <ul className="space-y-3 text-sm font-be-vietnam-pro">
                {navLinks.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-white/90 dark:hover:text-white transition" aria-label={l.label}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Address */}
            <div className="md:col-span-3 lg:col-span-3">
              <h3 className="text-xl font-semibold mb-5">Address</h3>
              <p className="text-sm font-be-vietnam-pro leading-relaxed max-w-xs text-zinc-200/90 dark:text-zinc-300/90 transition-colors">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus ipsum in eros vestibulum, nec tincidunt elit cursus.
              </p>
            </div>
            {/* Contact & Social */}
            <div className="md:col-span-3 lg:col-span-4 flex flex-col gap-10">
              <div>
                <h3 className="text-xl font-semibold mb-3">Contact</h3>
                <p className="text-sm font-be-vietnam-pro">(021) 22228000</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Social</h3>
                <div className="flex items-center gap-5">
                  {social.map(s => (
                    <a key={s.label} href={s.href} aria-label={s.label} className="text-white/80 hover:text-white transition">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-white/10 text-xs text-zinc-300 dark:text-zinc-400 flex flex-col md:flex-row gap-4 md:items-center justify-between transition-colors">
            <p>&copy; {new Date().getFullYear()} Bellara. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;