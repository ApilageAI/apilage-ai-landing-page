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
      {/* AI-Educational Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-700" />
      
      {/* Neural Network Visualization */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradient for connections */}
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.3"/>
            </linearGradient>
            
            {/* Educational node gradient */}
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1"/>
            </radialGradient>
          </defs>
          
          {/* Neural network connections */}
          <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none">
            {/* Layer 1 to Layer 2 connections */}
            <line x1="10%" y1="20%" x2="35%" y2="15%" />
            <line x1="10%" y1="20%" x2="35%" y2="30%" />
            <line x1="10%" y1="20%" x2="35%" y2="45%" />
            
            <line x1="10%" y1="40%" x2="35%" y2="15%" />
            <line x1="10%" y1="40%" x2="35%" y2="30%" />
            <line x1="10%" y1="40%" x2="35%" y2="45%" />
            
            <line x1="10%" y1="60%" x2="35%" y2="30%" />
            <line x1="10%" y1="60%" x2="35%" y2="45%" />
            <line x1="10%" y1="60%" x2="35%" y2="60%" />
            
            <line x1="10%" y1="80%" x2="35%" y2="45%" />
            <line x1="10%" y1="80%" x2="35%" y2="60%" />
            <line x1="10%" y1="80%" x2="35%" y2="75%" />
            
            {/* Layer 2 to Layer 3 connections */}
            <line x1="35%" y1="15%" x2="65%" y2="25%" />
            <line x1="35%" y1="15%" x2="65%" y2="40%" />
            <line x1="35%" y1="15%" x2="65%" y2="55%" />
            
            <line x1="35%" y1="30%" x2="65%" y2="25%" />
            <line x1="35%" y1="30%" x2="65%" y2="40%" />
            <line x1="35%" y1="30%" x2="65%" y2="55%" />
            <line x1="35%" y1="30%" x2="65%" y2="70%" />
            
            <line x1="35%" y1="45%" x2="65%" y2="40%" />
            <line x1="35%" y1="45%" x2="65%" y2="55%" />
            <line x1="35%" y1="45%" x2="65%" y2="70%" />
            
            <line x1="35%" y1="60%" x2="65%" y2="55%" />
            <line x1="35%" y1="60%" x2="65%" y2="70%" />
            
            <line x1="35%" y1="75%" x2="65%" y2="70%" />
            
            {/* Layer 3 to Output connections */}
            <line x1="65%" y1="25%" x2="90%" y2="35%" />
            <line x1="65%" y1="25%" x2="90%" y2="50%" />
            <line x1="65%" y1="25%" x2="90%" y2="65%" />
            
            <line x1="65%" y1="40%" x2="90%" y2="35%" />
            <line x1="65%" y1="40%" x2="90%" y2="50%" />
            <line x1="65%" y1="40%" x2="90%" y2="65%" />
            
            <line x1="65%" y1="55%" x2="90%" y2="50%" />
            <line x1="65%" y1="55%" x2="90%" y2="65%" />
            
            <line x1="65%" y1="70%" x2="90%" y2="65%" />
          </g>
          
          {/* Neural network nodes with educational symbols */}
          <g fill="url(#nodeGradient)" stroke="rgb(59, 130, 246)" strokeWidth="1.5">
            {/* Input layer - Educational inputs */}
            <circle cx="10%" cy="20%" r="8" />
            <circle cx="10%" cy="40%" r="8" />
            <circle cx="10%" cy="60%" r="8" />
            <circle cx="10%" cy="80%" r="8" />
            
            {/* Hidden layer 1 */}
            <circle cx="35%" cy="15%" r="6" />
            <circle cx="35%" cy="30%" r="6" />
            <circle cx="35%" cy="45%" r="6" />
            <circle cx="35%" cy="60%" r="6" />
            <circle cx="35%" cy="75%" r="6" />
            
            {/* Hidden layer 2 */}
            <circle cx="65%" cy="25%" r="6" />
            <circle cx="65%" cy="40%" r="6" />
            <circle cx="65%" cy="55%" r="6" />
            <circle cx="65%" cy="70%" r="6" />
            
            {/* Output layer */}
            <circle cx="90%" cy="35%" r="8" />
            <circle cx="90%" cy="50%" r="8" />
            <circle cx="90%" cy="65%" r="8" />
          </g>
          
          {/* Educational symbols inside key nodes */}
          <g fill="rgb(59, 130, 246)" fontSize="8" textAnchor="middle" dominantBaseline="middle" opacity="0.6">
            <text x="10%" y="20%">📚</text>
            <text x="10%" y="40%">🧮</text>
            <text x="10%" y="60%">🔬</text>
            <text x="10%" y="80%">📝</text>
            
            <text x="90%" y="35%">🎓</text>
            <text x="90%" y="50%">💡</text>
            <text x="90%" y="65%">✨</text>
          </g>
        </svg>
      </div>
      
      {/* Floating Knowledge Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/5 w-2 h-2 bg-blue-400/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-red-400/40 rounded-full blur-sm"
        />
      </div>
      
      {/* Subtle AI Data Flow Animation */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]">
        <motion.div
          animate={{ 
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 100%, rgba(59, 130, 246, 0.1) 150%, transparent 200%)"
            ]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-px absolute top-1/4"
        />
        <motion.div
          animate={{ 
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 100%, rgba(147, 51, 234, 0.1) 150%, transparent 200%)"
            ]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="w-full h-px absolute top-2/3"
        />
      </div>

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
              Sri Lanka&#39;s First Advanced AI Model
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

          {/* Clean Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
              {[
                {
                  icon: BookOpen,
                  title: "A/L & O/L Coverage"
                },
                {
                  icon: MessageSquare,
                  title: "Native Sinhala Chat"
                },
                {
                  icon: Zap,
                  title: "24/7 Instant Help"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-full px-5 py-2.5 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-red-500/10 rounded-full flex items-center justify-center">
                      <feature.icon className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {feature.title}
                    </span>
                  </div>
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
