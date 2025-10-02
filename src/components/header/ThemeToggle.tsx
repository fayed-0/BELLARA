import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

// Dark mode toggle using global ThemeProvider
const ThemeToggle: React.FC = () => {
  const { dark, toggle } = useTheme();

  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className="group relative w-11 h-11 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white/80 dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 shadow-sm hover:shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white"
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-12 bg-white/60 dark:bg-white/10 blur-xl" />
      </span>
      <span className="relative flex items-center justify-center w-full h-full">
        {dark ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07-1.42-1.42M6.35 8.35 4.93 6.93m12.72-2.72-1.42 1.42M6.35 15.65l-1.42 1.42" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
