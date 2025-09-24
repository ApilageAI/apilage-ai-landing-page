'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn, utils } from '../../lib/utils';

interface WelcomeSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const welcomeSlides: WelcomeSlide[] = [
  {
    id: 1,
    image: '/images/graph.gif',
    title: 'Get started with Apilage AI 🇱🇰',
    description: 'Sri Lankan first native sinhala AI platform designed to assist you with studies based on Sri Lankan syllabuses',
  },
  {
    id: 2,
    image: '/images/0826.gif',
    title: 'Fast and Accurate in සිංහල',
    description: 'With thousands of Sinhala datasheets and past papers textbooks, it\'s more accurate than ChatGPT or other AI models.',
  },
  {
    id: 3,
    image: '/images/08263.gif',
    title: 'Introducing AI based MCQ Helper',
    description: 'Do you struggle with multiple-choice questions? Our AI can help you practice and improve your skills. Also you can challenge your friends with MCQ game, and view your score and see the explanations.',
  },
  {
    id: 4,
    image: '/images/08262.gif',
    title: 'Apilage AI Mind map',
    description: 'Apilageai will genarate mind maps based on what you have asked, its more cool editable and downloadble. study is more fun and productive with apilageai',
    isLast: true,
  },
];

export default function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // TEMPORARILY DISABLED - To re-enable, uncomment the lines below
    // const hasSeenWelcome = utils.storage.getItem('welcomeboxShown');
    // if (!hasSeenWelcome) {
    //   setIsVisible(true);
    // }
    
    // Keep modal hidden for now
    setIsVisible(false);
  }, []);

  const handleNext = () => {
    if (currentSlide < welcomeSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleClose = () => {
    if (dontShowAgain) {
      utils.storage.setItem('welcomeboxShown', true);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const slide = welcomeSlides[currentSlide];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 relative shadow-2xl"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="mb-6 relative h-48 w-full rounded-lg overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-contain"
                unoptimized={slide.image.endsWith('.gif')}
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {slide.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {slide.description}
            </p>

            <div className="flex justify-center mb-6">
              {welcomeSlides.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full mx-1 transition-colors',
                    index === currentSlide 
                      ? 'bg-red-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  )}
                />
              ))}
            </div>

            <button
              onClick={slide.isLast ? handleClose : handleNext}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {slide.isLast ? 'Continue' : 'Next'}
            </button>

            <div className="mt-4 flex items-center justify-center">
              <input
                type="checkbox"
                id="dont-show"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="mr-2"
              />
              <label 
                htmlFor="dont-show" 
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Do not show this box again
              </label>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
