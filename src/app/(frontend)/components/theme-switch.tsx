"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { FaCircleHalfStroke } from "react-icons/fa6";
import {Moon, Sun} from "lucide-react";

const storageKey = 'theme-preference';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export const ThemeSwitch: React.FC = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<'auto' | 'light' | 'dark'>('auto');

  const getColorPreference = (): 'auto' | 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem(storageKey);
      if (storedPreference) {
        return storedPreference as 'auto' | 'light' | 'dark';
      }
      return getSystemTheme();
    }
    return 'light';
  };

  const reflectPreference = (theme: 'auto' | 'light' | 'dark') => {
    document.documentElement.classList.remove('bg-light', 'bg-dark');
    document.documentElement.classList.add(`bg-${theme}`);
    setCurrentTheme(theme);
    setTheme(theme);
  };

  React.useEffect(() => {
    setMounted(true);
    const initTheme = getColorPreference();
    reflectPreference(initTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const newTheme = getSystemTheme();
      localStorage.setItem(storageKey, newTheme);
      reflectPreference(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  const toggleTheme = () => {
    //const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    let newTheme = currentTheme;
    if(currentTheme === 'auto'){
      newTheme = getSystemTheme() === 'dark' ? 'light' : 'dark';
    } else if(currentTheme === 'light'){
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }

    localStorage.setItem(storageKey, newTheme);
    reflectPreference(newTheme);
  };

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (!mounted) {
    return (
      <FaCircleHalfStroke
        className="h-[14px] w-[14px] text-[#1c1c1c]"
        aria-hidden="true"
      />
    );
  }

  return (
/*    <button
      id="theme-toggle"
      aria-label={`${currentTheme} mode`}
      onClick={toggleTheme}
      className="flex items-center justify-center transition-opacity duration-300 hover:opacity-90 mr-10"
    >
      <FaCircleHalfStroke
        className={`h-[14px] w-[14px] ${
          currentTheme === "dark" ? "text-[#D4D4D4]" : "text-[#1c1c1c]"
        }`}
      />
    </button>*/
/*      <button id="theme-toggle"
              className="flex items-center justify-center transition-opacity duration-300 hover:opacity-90 mr-10"
              aria-label={`${currentTheme} mode`}
              onClick={toggleTheme}>
        {currentTheme === 'auto' && (getSystemTheme() === 'dark' ? '🌙' : '☀️')}
        {currentTheme === 'light' && '☀️'}
        {currentTheme === 'dark' && '🌙'}
      </button>*/

      <button
          id="theme-toggle"
          className="flex items-center justify-center transition-opacity duration-300 hover:opacity-90 mr-10"
          aria-label={`${currentTheme} mode`}
          onClick={toggleTheme}
      >
        {currentTheme === 'auto' && (getSystemTheme() === 'dark'
                ? <Moon className="h-4 w-4" color="#11a1ac"/>
                : <Sun className="h-4 w-4" color="#11a1ac"/>
        )}
        {currentTheme === 'light' && <Sun className="h-4 w-4"/>}
        {currentTheme === 'dark' && <Moon className="h-4 w-4"/>}
      </button>



  );
};