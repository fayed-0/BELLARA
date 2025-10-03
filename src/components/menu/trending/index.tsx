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
                </div>
                <div className="w-[1275px] h-[1574px] absolute left-0 top-[926px] rounded overflow-hidden">
                  <img loading="lazy" src={img1275x1574} alt="Feature 1275x1574" className="w-full h-full object-cover" draggable={false} />
                </div>
                <div className="w-[1275px] h-[850px] absolute left-0 top-[2520px] rounded overflow-hidden">
                  <img loading="lazy" src={img1275x850} alt="Highlight 1275x850" className="w-full h-full object-cover" draggable={false} />
                </div>
                <div className="w-[554px] h-[380px] absolute left-[721px] top-[520px] rounded overflow-hidden">
                  <img loading="lazy" src={img554x380} alt="Detail 554x380" className="w-full h-full object-cover" draggable={false} />
                </div>
                <div className="w-[555px] h-[500px] absolute left-[720px] top-0 rounded overflow-hidden">
                  <img loading="lazy" src={img555x500} alt="Detail 555x500" className="w-full h-full object-cover" draggable={false} />
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

