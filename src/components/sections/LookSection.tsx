'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SlideContent {
  heading: string;
  text: string;
  image: string;
}

const slideContents: SlideContent[] = [
  {
    heading: 'Graphing අත්දැකීම',
    text: 'අපිලගේ Grapher එක්ක, දැන් වඩා හොද පැහැදිලි කිරීමක් ලංකාවේ පලවෙනි වතාවට AI Free Graph analyser අදම Try එකක් දෙන්න',
    image: '/images/graph.gif',
  },
  {
    heading: 'Image Analyser එක try කලාද?',
    text: 'Type කරලා AI එකෙන් අහන්න කම්මැලද? 😌 ඉතින් එහෙනම් ඔයාට අහන්න ඕන දේ කොලේක ලියලා upload කරලග අහන්න. Limitation නැති ලංකාවේ එකම AI Image Analyser එක අදම try කරන්න',
    image: '/images/imgup.gif',
  },
];

export default function LookSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Slide content rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideContents.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slideContents[currentSlideIndex];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          key={currentSlideIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12"
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {currentSlide.heading}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {currentSlide.text}
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md h-64 lg:h-80">
              <Image
                src={currentSlide.image}
                alt={currentSlide.heading}
                fill
                className="object-contain rounded-xl"
                unoptimized={currentSlide.image.endsWith('.gif')}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
