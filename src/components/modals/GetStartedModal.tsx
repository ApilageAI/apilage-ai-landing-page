'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface GetStartedModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function GetStartedModal({ isVisible, onClose }: GetStartedModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleGetStarted = () => {
    // Navigate to app or login
    window.open('/app', '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed inset-x-4 bottom-4 md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto z-[61]"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-md mx-auto md:w-96">
              
              {/* Header */}
              <div className="relative p-6 pb-4">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Logo and flag */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <Image 
                      src="/images/icon.png" 
                      alt="Apilage AI" 
                      width={48} 
                      height={48}
                      className="rounded-xl"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -inset-1 bg-red-500/20 rounded-xl blur-md -z-10"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      Get started with Apilage AI
                      <span className="text-lg">🇱🇰</span>
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Sri Lankan first native sinhala AI platform designed to assist you with studies based on Sri Lankan syllabuses
                </p>
              </div>

              {/* Features */}
              <div className="px-6 pb-6">
                <div className="space-y-3 mb-6">
                  {[
                    { icon: "📚", text: "A/L & O/L syllabus support" },
                    { icon: "🗣️", text: "Native Sinhala conversations" },
                    { icon: "⚡", text: "Instant homework help" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-base">{feature.icon}</span>
                      {feature.text}
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Learning Now
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-3">
                  Free trial • No credit card required
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
