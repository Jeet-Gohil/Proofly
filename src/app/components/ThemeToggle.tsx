'use client';

import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // ← install this package if not installed

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Detect saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const root = document.documentElement;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(initialTheme);

    if (initialTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = !darkMode;

    if (newTheme) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setDarkMode(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}
