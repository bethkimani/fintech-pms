// components/marketing/Header.tsx
'use client';

import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = ["Features", "News", "Pricing", "FAQ", "Contact"];

  // Apply/remove the `dark` class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setDarkMode(saved === "true");
    } else {
      // Optional: respect system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Save preference
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <nav className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                PMS
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance Management System
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* DARK MODE TOGGLE – NOW FULLY FUNCTIONAL */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              Log in
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 pb-3 border-t dark:border-gray-700">
                <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Log in
                </a>

                {/* Mobile Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md mb-2 flex items-center gap-2"
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-500" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      Dark Mode
                    </>
                  )}
                </button>

                <a
                  href="#"
                  className="block w-full text-center bg-primary hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}