'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const promoMessages = [
  'අපිලගේ AI වලට අලුත් ඔයාට අපි ගානේ රුපියල් 50 ක Free Credit එකක්!',
  'ලංකාවේ පළවෙනි 🇱🇰 සිංහල multi task AI agent එක්ක කතා කරන්න!',
  'AI වල Premium අත්දෑකීම අදම විදින්න!',
];

export default function PromoBanner() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % promoMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-20 left-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg shadow-lg z-40 flex items-center justify-between"
    >
      <motion.p
        key={currentMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-medium flex-1"
      >
        {promoMessages[currentMessage]}
      </motion.p>
      
      <div className="flex items-center gap-2 ml-4">
        <Link 
          href="/auth/login"
          className="bg-white text-red-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          Try Now
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
