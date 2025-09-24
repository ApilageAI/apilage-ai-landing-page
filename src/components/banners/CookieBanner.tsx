'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { utils } from '../../lib/utils';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = utils.storage.getCookie('cookieAccepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    utils.storage.setCookie('cookieAccepted', 'true', 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t-2 border-yellow-400 p-4 flex items-center justify-between z-40 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
          alt="Cookie"
          width={40}
          height={40}
        />
        <p className="text-gray-800 text-sm">
          Apilageai uses cookies to ensure you get the best experience.
        </p>
      </div>
      
      <button
        onClick={acceptCookies}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Accept
      </button>
    </motion.div>
  );
}
