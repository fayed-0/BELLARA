import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Type for context value
interface ThemeContextValue {
  dark: boolean;
  toggle: () => void;
  setDark: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Key for localStorage
const STORAGE_KEY = 'bellara-theme';

function applyClass(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Try detect system preference only first render if no stored preference
function detectInitial(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(() => detectInitial());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // avoid mismatch SSR/hydration scenario
    applyClass(dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {/* ignore */}
  }, [dark, mounted]);

  const toggle = useCallback(() => setDark(d => !d), []);

  const value: ThemeContextValue = { dark, toggle, setDark };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
