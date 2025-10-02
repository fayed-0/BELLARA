import React from 'react';

interface HeroProps {
  showVisual?: boolean; // toggle image / artwork column
}

const Hero: React.FC<HeroProps> = ({ showVisual = true }) => {
  return (
  <section className="relative w-full bg-gradient-to-b from-white via-white to-zinc-50/60 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900/60 transition-colors">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-20">
  <div className="relative mt-2 md:mt-4 rounded-[34px] md:rounded-[40px] border border-zinc-200/60 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] overflow-hidden dark:border-zinc-700/60 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800/90 dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45)] transition-colors">
          {/* Ambient light */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
              <div className="absolute -top-28 right-0 w-[55%] h-72 bg-white/40 dark:bg-white/10 blur-3xl opacity-70 transition" />
              <div className="absolute bottom-0 left-0 w-[30%] h-40 bg-white/30 dark:bg-white/5 blur-2xl opacity-70 transition" />
            </div>
          <div className="relative px-5 sm:px-8 lg:px-14 xl:px-20 py-16 md:py-24 xl:py-32 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-xl md:max-w-2xl">
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-wide uppercase font-medium bg-neutral-900 text-white shadow-sm mb-6 dark:bg-white dark:text-neutral-900">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> <span className="sr-only md:not-sr-only">New Arrival</span>
              </p>
              <h1 className="heading-1 text-neutral-900 dark:text-white mb-6 transition-colors">
                Elevate your style with timeless essentials.
              </h1>
              <p className="body-text text-neutral-700 dark:text-zinc-300 max-w-[560px] mb-9 transition-colors">
                Discover curated collections crafted with care. Minimal aesthetics, premium materials, and sustainable vision — built for everyday confidence and comfort.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <button className="btn-primary">
                  <span className="btn-primary__gradient" />
                  <span className="relative z-10">Shop Now</span>
                </button>
                <a href="#collections" className="text-neutral-800 dark:text-zinc-200 font-inter text-sm font-medium underline underline-offset-4 hover:text-neutral-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white rounded transition-colors">
                  View Collections
                </a>
              </div>
            </div>
            {showVisual && (
              <div className="relative hidden md:block">
                <div className="aspect-[4/5] w-full max-w-md lg:max-w-lg ml-auto rounded-[32px] bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 overflow-hidden shadow-2xl ring-1 ring-black/10 dark:from-zinc-200 dark:via-white dark:to-zinc-200 flex items-center justify-center transition-colors">
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.25),transparent_60%)]" />
                  <div className="text-white dark:text-neutral-900 font-inter px-6 text-center transition-colors">
                    <h3 className="text-xl font-semibold mb-3">Seasonal Drop</h3>
                    <p className="text-sm text-white/80 dark:text-neutral-700 leading-relaxed transition-colors">Preview imagery / model photography placeholder. Replace with product showcase carousel or featured artwork.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;