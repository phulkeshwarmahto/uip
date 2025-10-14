import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeVariant = 'default' | 'ocean' | 'forest' | 'sunset' | 'vintage' | 'govtech-sapphire';

interface UseThemeReturn {
  theme: Theme;
  themeVariant: ThemeVariant;
  setTheme: (theme: Theme) => void;
  setThemeVariant: (variant: ThemeVariant) => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('light');
  const [themeVariant, setThemeVariantState] = useState<ThemeVariant>('govtech-sapphire');

  useEffect(() => {
    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light';
    const savedVariant = (localStorage.getItem('theme') as ThemeVariant) || 'govtech-sapphire';
    
    setThemeState(savedTheme);
    setThemeVariantState(savedVariant);
  }, []);

  const setTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', newTheme === 'dark' ? 'true' : 'false');
    setThemeState(newTheme);
  };

  const setThemeVariant = (variant: ThemeVariant) => {
    const root = document.documentElement;
    
    // Remove existing theme attributes
    root.removeAttribute('data-theme');
    
    // Apply new theme variant
    if (variant !== 'default') {
      root.setAttribute('data-theme', variant);
    }
    
    localStorage.setItem('theme', variant);
    setThemeVariantState(variant);
  };

  return {
    theme,
    themeVariant,
    setTheme,
    setThemeVariant,
  };
}