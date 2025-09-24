'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, MessageSquare, Zap } from 'lucide-react';
import GetStartedModal from '../modals/GetStartedModal';

// ============================
// AI VISUALIZATION COMPONENT
// ============================


// ============================
// HERO SECTION COMPONENT
// ============================

interface HeroSectionProps {
  isLoggedIn?: boolean;
}

// Real Sri Lankan student pain points and questions
const studentQuestions = [
  "මට physics වල motion එක ගැන explain කරන්නකෝ...",
  "How to solve quadratic equations easily?",
  "Biology වල photosynthesis process එක කොහොමද?",
  "Chemistry වල periodic table memorize කරන්නේ කොහොමද?",
  "A/L math වල calculus කරන හැටි කියන්නකෝ...",
  "English essay writing tips මොනවද?",
  "History වල colonial period ගැන summary එකක් ඕන...",
  "Geography වල climate change effects මොනවද?"
];


export default function HeroSection({ isLoggedIn = false }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);

  // Typewriter effect for placeholder
  useEffect(() => {
    if (searchQuery) return; // Don't show typewriter if user is typing

    const currentQuestion = studentQuestions[currentQuestionIndex];
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      if (isTyping) {
        if (currentIndex < currentQuestion.length) {
          setCurrentPlaceholder(currentQuestion.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeWriter, 50 + Math.random() * 50); // Vary typing speed
        } else {
          // Pause at end
          timeoutId = setTimeout(() => setIsTyping(false), 2000);
        }
      } else {
        // Delete text
        if (currentIndex > 0) {
          setCurrentPlaceholder(currentQuestion.slice(0, currentIndex - 1));
          currentIndex--;
          timeoutId = setTimeout(typeWriter, 30);
        } else {
          // Move to next question
          setCurrentQuestionIndex((prev) => (prev + 1) % studentQuestions.length);
          setIsTyping(true);
        }
      }
    };

    timeoutId = setTimeout(typeWriter, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentQuestionIndex, isTyping, searchQuery]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to app with query
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      window.location.href = `${baseUrl}/app?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Clean, minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      
      {/* Subtle accent */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 dark:bg-red-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Clean badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
              Sri Lanka's First Advanced AI Model
            </span>
          </motion.div>
          
          {/* Clean, centered heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold leading-tight mb-8"
          >
            <span className="text-gray-900 dark:text-white">
              Introducing{" "}
            </span>
            <motion.span 
              className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              අපිලගේ AI
            </motion.span>
            <span className="text-gray-900 dark:text-white">
              {" "}for Sri Lanka
            </span>
          </motion.h1>
          
          {/* Clean subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            <strong className="text-gray-700 dark:text-gray-300">ලාංකික අපේ අනාගතය වෙනුවෙන්</strong> අපිලගේ AI දැන් ඔබේ අතටම
          </motion.p>

          {/* Clean search box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16 max-w-2xl mx-auto"
          >
            <form 
              className="flex items-center bg-white dark:bg-gray-800 rounded-full p-2 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:shadow-lg"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchQuery ? "Ask me anything..." : currentPlaceholder}
                className="flex-1 px-6 py-4 bg-transparent border-none outline-none text-base placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>

          {/* Professional Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-12"
          >
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              {[
                {
                  icon: BookOpen,
                  title: "A/L & O/L",
                  description: "Syllabus coverage"
                },
                {
                  icon: MessageSquare,
                  title: "Native Sinhala",
                  description: "Natural chat"
                },
                {
                  icon: Zap,
                  title: "Instant Help",
                  description: "24/7 support"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 rounded-lg p-3 text-center hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:border-gray-300/30 dark:hover:border-gray-600/30"
                >
                  <feature.icon className="w-4 h-4 mx-auto mb-1.5 text-red-500" />
                  <h3 className="font-medium text-gray-900 dark:text-white text-xs leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Clean stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-1">
                {/* Natural, muted profile avatars with initials */}
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xs font-medium">
                  A
                </div>
                <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-medium">
                  S
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs font-medium">
                  T
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400 text-xs">
                  +9
                </div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">1000+ Students across Sri Lanka</span>
            </div>
            
            <Link 
              href="https://play.google.com/store/apps/details?id=com.apilageai.apilageai&hl=en" 
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Get Started Modal */}
      <GetStartedModal 
        isVisible={showGetStartedModal}
        onClose={() => setShowGetStartedModal(false)}
      />
    </section>
  );
}
