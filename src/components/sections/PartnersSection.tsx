'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function PartnersSection() {
  return (
    <section id="partners" className="py-16 bg-gradient-to-r from-pink-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-sm font-medium border border-gray-200 dark:border-gray-700">
              <Users className="w-4 h-4 mr-2 text-red-500" />
              Working with
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Power and Technology
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join the growing network of organizations leveraging ApilageAI cutting-edge technology
          </p>
        </div>

        <div className="flex items-center justify-center gap-12 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src="/images/partners/globbook.png"
              alt="Globbook"
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src="/images/partners/nividu.webp"
              alt="Nividu"
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
