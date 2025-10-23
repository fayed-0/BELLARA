import React, { useEffect, useState } from 'react';
import Footer from '../../footer';
import img700x905 from './source/700x905.png';
import img1275x1574 from './source/1275x1574.png';
import img1275x850 from './source/1275x850.png';
import img554x380 from './source/554x380.png';
import img555x500 from './source/555x500.png';

// Responsive absolute skeleton layout: scales proportionally on smaller screens without reflowing boxes.
// Replace gray boxes with images (e.g., add background-image or <img> inside each box) later.

const BASE_W = 1512;
const BASE_H = 3644;
// Removed MIN_SCALE per user request: biarkan mengecil natural mengikuti lebar viewport

const Trending: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const openPopup = (id: string) => setActiveCard(id);
  const closePopup = () => setActiveCard(null);

  useEffect(() => {
    const update = () => {
  const w = window.innerWidth;
  // scale down natural; no min clamp (can go sangat kecil sesuai arahan)
  const raw = w / BASE_W;
  const s = Math.min(raw, 1);
  setScale(s);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scaledHeight = BASE_H * scale; // used to reserve vertical space in flow

  return (
  <div className="w-full bg-white dark:bg-zinc-950 font-inter text-neutral-900 dark:text-white flex flex-col overflow-x-hidden touch-pan-y">
  {/* Mobile heading separate (hidden on md and up) */}
  <div className="md:hidden px-6 pt-10">
    <h1 className="text-3xl font-semibold leading-tight tracking-tight">The Art of Everyday Luxury</h1>
  </div>
  <div className="flex justify-center pt-6 md:pt-14">
        {/* Flow spacer ensures page height matches scaled content */}
        <div className="relative w-full flex justify-center" style={{ minHeight: scaledHeight }}>
          <div
            className="pointer-events-none"
            style={{
              width: BASE_W,
              height: BASE_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              position: 'absolute',
            }}
          >
            <div className="w-[1512px] h-[3644px] relative bg-white dark:bg-zinc-950 overflow-hidden">
              <h1 className="w-[834px] absolute left-[120px] top-[180px] md:top-[4px] text-3xl md:text-5xl font-semibold leading-tight tracking-tight pointer-events-auto hidden md:block">
                The Art of Everyday Luxury
              </h1>
              <div className="w-[1275px] h-[3427px] absolute left-[120px] top-[100px] md:top-[100px] overflow-visible transition-all">
                <div className="w-[700px] h-[905px] absolute left-0 top-0 rounded overflow-hidden">
                  <img loading="lazy" src={img700x905} alt="Showcase 700x905" className="w-full h-full object-cover" draggable={false} />
                  {/* Click overlay */}
                  <button
                    type="button"
                    aria-label="Buka popup sosial media"
                    onClick={() => openPopup('img700x905')}
                    className="absolute inset-0 pointer-events-auto z-10"
                  />
                  {activeCard === 'img700x905' && (
                    <div className="absolute inset-0 z-20 pointer-events-auto">
                      <div className="absolute inset-0 bg-black/30" onClick={closePopup} />
                      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e)=>e.stopPropagation()}>
                        <div
                          role="dialog"
                          aria-modal="true"
                          aria-label="Follow us on social media"
                          className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white rounded-xl shadow-2xl border border-black/10 dark:border-white/10 w-[300px] max-w-full p-5"
                        >
                          <h3 className="text-base font-semibold mb-2">Follow us</h3>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">Stay updated with our latest news and offers.</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <a href="https://www.instagram.com/bellara.local?igsh=enViOHY5cHg0dzA1&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10">
                              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg>
                            </a>
                            <a href="https://www.tiktok.com/@bellara.local?_t=ZS-90EmdFTGbsm&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10">
                              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.5 2h3.1c.1 1.2.6 2.2 1.3 3 .8.9 1.8 1.4 3 1.5v3.2c-1.7-.1-3.3-.7-4.5-1.6v6.9a6.9 6.9 0 1 1-6.9-6.9c.3 0 .7 0 1 .1v3.4a3.5 3.5 0 1 0 2.4 3.3L13.5 2Z" /></svg>
                            </a>
                            <a href="https://www.facebook.com/share/17UHwvQoLG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10">
                              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4Z" /></svg>
                            </a>
                          </div>
                          <div className="mt-4 flex justify-end"><button type="button" onClick={closePopup} className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white underline">Tutup</button></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-[1275px] h-[1574px] absolute left-0 top-[926px] rounded overflow-hidden">
                  <img loading="lazy" src={img1275x1574} alt="Feature 1275x1574" className="w-full h-full object-cover" draggable={false} />
                  <button
                    type="button"
                    aria-label="Buka popup sosial media"
                    onClick={() => openPopup('img1275x1574')}
                    className="absolute inset-0 pointer-events-auto z-10"
                  />
                  {activeCard === 'img1275x1574' && (
                    <div className="absolute inset-0 z-20 pointer-events-auto">
                      <div className="absolute inset-0 bg-black/30" onClick={closePopup} />
                      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e)=>e.stopPropagation()}>
                        <div role="dialog" aria-modal="true" aria-label="Follow us on social media" className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white rounded-xl shadow-2xl border border-black/10 dark:border-white/10 w-[300px] max-w-full p-5">
                          <h3 className="text-base font-semibold mb-2">Follow us</h3>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">Stay updated with our latest news and offers.</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <a href="https://www.instagram.com/bellara.local?igsh=enViOHY5cHg0dzA1&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg></a>
                            <a href="https://www.tiktok.com/@bellara.local?_t=ZS-90EmdFTGbsm&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.5 2h3.1c.1 1.2.6 2.2 1.3 3 .8.9 1.8 1.4 3 1.5v3.2c-1.7-.1-3.3-.7-4.5-1.6v6.9a6.9 6.9 0 1 1-6.9-6.9c.3 0 .7 0 1 .1v3.4a3.5 3.5 0 1 0 2.4 3.3L13.5 2Z" /></svg></a>
                            <a href="https://www.facebook.com/share/17UHwvQoLG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4Z" /></svg></a>
                          </div>
                          <div className="mt-4 flex justify-end"><button type="button" onClick={closePopup} className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white underline">Tutup</button></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-[1275px] h-[850px] absolute left-0 top-[2520px] rounded overflow-hidden">
                  <img loading="lazy" src={img1275x850} alt="Highlight 1275x850" className="w-full h-full object-cover" draggable={false} />
                  <button
                    type="button"
                    aria-label="Buka popup sosial media"
                    onClick={() => openPopup('img1275x850')}
                    className="absolute inset-0 pointer-events-auto z-10"
                  />
                  {activeCard === 'img1275x850' && (
                    <div className="absolute inset-0 z-20 pointer-events-auto">
                      <div className="absolute inset-0 bg-black/30" onClick={closePopup} />
                      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e)=>e.stopPropagation()}>
                        <div role="dialog" aria-modal="true" aria-label="Follow us on social media" className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white rounded-xl shadow-2xl border border-black/10 dark:border-white/10 w-[300px] max-w-full p-5">
                          <h3 className="text-base font-semibold mb-2">Follow us</h3>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">Stay updated with our latest news and offers.</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <a href="https://www.instagram.com/bellara.local?igsh=enViOHY5cHg0dzA1&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg></a>
                            <a href="https://www.tiktok.com/@bellara.local?_t=ZS-90EmdFTGbsm&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.5 2h3.1c.1 1.2.6 2.2 1.3 3 .8.9 1.8 1.4 3 1.5v3.2c-1.7-.1-3.3-.7-4.5-1.6v6.9a6.9 6.9 0 1 1-6.9-6.9c.3 0 .7 0 1 .1v3.4a3.5 3.5 0 1 0 2.4 3.3L13.5 2Z" /></svg></a>
                            <a href="https://www.facebook.com/share/17UHwvQoLG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4Z" /></svg></a>
                          </div>
                          <div className="mt-4 flex justify-end"><button type="button" onClick={closePopup} className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white underline">Tutup</button></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-[554px] h-[380px] absolute left-[721px] top-[520px] rounded overflow-hidden">
                  <img loading="lazy" src={img554x380} alt="Detail 554x380" className="w-full h-full object-cover" draggable={false} />
                  <button
                    type="button"
                    aria-label="Buka popup sosial media"
                    onClick={() => openPopup('img554x380')}
                    className="absolute inset-0 pointer-events-auto z-10"
                  />
                  {activeCard === 'img554x380' && (
                    <div className="absolute inset-0 z-20 pointer-events-auto">
                      <div className="absolute inset-0 bg-black/30" onClick={closePopup} />
                      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e)=>e.stopPropagation()}>
                        <div role="dialog" aria-modal="true" aria-label="Follow us on social media" className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white rounded-xl shadow-2xl border border-black/10 dark:border-white/10 w-[300px] max-w-full p-5">
                          <h3 className="text-base font-semibold mb-2">Follow us</h3>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">Stay updated with our latest news and offers.</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <a href="https://www.instagram.com/bellara.local?igsh=enViOHY5cHg0dzA1&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg></a>
                            <a href="https://www.tiktok.com/@bellara.local?_t=ZS-90EmdFTGbsm&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.5 2h3.1c.1 1.2.6 2.2 1.3 3 .8.9 1.8 1.4 3 1.5v3.2c-1.7-.1-3.3-.7-4.5-1.6v6.9a6.9 6.9 0 1 1-6.9-6.9c.3 0 .7 0 1 .1v3.4a3.5 3.5 0 1 0 2.4 3.3L13.5 2Z" /></svg></a>
                            <a href="https://www.facebook.com/share/17UHwvQoLG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4Z" /></svg></a>
                          </div>
                          <div className="mt-4 flex justify-end"><button type="button" onClick={closePopup} className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white underline">Tutup</button></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-[555px] h-[500px] absolute left-[720px] top-0 rounded overflow-hidden">
                  <img loading="lazy" src={img555x500} alt="Detail 555x500" className="w-full h-full object-cover" draggable={false} />
                  <button
                    type="button"
                    aria-label="Buka popup sosial media"
                    onClick={() => openPopup('img555x500')}
                    className="absolute inset-0 pointer-events-auto z-10"
                  />
                  {activeCard === 'img555x500' && (
                    <div className="absolute inset-0 z-20 pointer-events-auto">
                      <div className="absolute inset-0 bg-black/30" onClick={closePopup} />
                      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e)=>e.stopPropagation()}>
                        <div role="dialog" aria-modal="true" aria-label="Follow us on social media" className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white rounded-xl shadow-2xl border border-black/10 dark:border-white/10 w-[300px] max-w-full p-5">
                          <h3 className="text-base font-semibold mb-2">Follow us</h3>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">Stay updated with our latest news and offers.</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <a href="https://www.instagram.com/bellara.local?igsh=enViOHY5cHg0dzA1&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg></a>
                            <a href="https://www.tiktok.com/@bellara.local?_t=ZS-90EmdFTGbsm&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.5 2h3.1c.1 1.2.6 2.2 1.3 3 .8.9 1.8 1.4 3 1.5v3.2c-1.7-.1-3.3-.7-4.5-1.6v6.9a6.9 6.9 0 1 1-6.9-6.9c.3 0 .7 0 1 .1v3.4a3.5 3.5 0 1 0 2.4 3.3L13.5 2Z" /></svg></a>
                            <a href="https://www.facebook.com/share/17UHwvQoLG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition border border-black/10 dark:border-white/10"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4Z" /></svg></a>
                          </div>
                          <div className="mt-4 flex justify-end"><button type="button" onClick={closePopup} className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white underline">Tutup</button></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Trending;

