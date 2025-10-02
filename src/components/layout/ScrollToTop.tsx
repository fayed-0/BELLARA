import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls window to top on every pathname change (route navigation)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Use auto to avoid unwanted smooth animation between pages
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
