'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { utils } from '../lib/utils';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#blog', label: 'Blog' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize dark mode
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const savedTheme = utils.theme.getSavedTheme();
      const systemPreference = utils.theme.prefersColorScheme();
      const currentTheme = savedTheme === 'system' || !savedTheme ? systemPreference : savedTheme;
      
      // Only update state if it's different to prevent unnecessary re-renders
      if ((currentTheme === 'dark') !== isDarkMode) {
        setIsDarkMode(currentTheme === 'dark');
      }
      
      // Apply theme to document for Tailwind dark mode
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    utils.theme.saveTheme(newTheme);
    setIsDarkMode(!isDarkMode);
    
    // Apply theme to document for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle navigation clicks
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      utils.animation.scrollToElement(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
          isScrolled ? 'top-2' : 'top-4'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className={`relative backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
              isScrolled
                ? 'bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-gray-800/20 shadow-xl'
                : 'bg-white/60 dark:bg-gray-900/60 border-white/10 dark:border-gray-800/10 shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <Image 
                  src="/images/icon.png" 
                  alt="අපිලගේ AI" 
                  width={40} 
                  height={40}
                  className="rounded-xl"
                />
                <div className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                    APILAGE
                  </span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white ml-1">AI</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                  >
                    {link.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <motion.button
                  onClick={toggleDarkMode}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors group"
                  aria-label="Toggle dark mode"
                >
                  <AnimatePresence mode="wait">
                    {isDarkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sun className="w-5 h-5 text-yellow-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon className="w-5 h-5 text-gray-700" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Login Button */}
                <Link
                  href="/app"
                  className="relative px-6 py-2.5 font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group transform hover:scale-105 active:scale-95"
                >
                  <div
                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600"
                  />
                  <span className="relative z-10">Try Now</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-20 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-800/20 shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                {/* Mobile Navigation Links */}
                <nav className="space-y-1 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full text-left px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/10 rounded-xl transition-all duration-200"
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <motion.button
                    onClick={toggleDarkMode}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <Moon className="w-5 h-5 text-gray-700" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {isDarkMode ? 'Light' : 'Dark'} Mode
                    </span>
                  </motion.button>

                  <Link
                    href="/app"
                    className="px-6 py-2.5 font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Try Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


