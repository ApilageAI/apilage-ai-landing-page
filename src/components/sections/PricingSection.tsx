'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { utils } from '../../lib/utils';

interface PricingSectionProps {
  isLoggedIn?: boolean;
}

export default function PricingSection({ isLoggedIn = false }: PricingSectionProps) {
  const [priceValue, setPriceValue] = useState(200);

  // Handle pricing recharge
  const handleRecharge = () => {
    if (isLoggedIn) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      window.location.href = `${baseUrl}/pay/${priceValue}`;
    } else {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      window.location.href = `${baseUrl}/auth/login`;
    }
  };

  const pricingData = [
    ['Rs. 0.6', 'එක වචනයක් යවන්න ඔයාගෙන් රු 0.6 වගේ මුදලක් විතරයි වැය වෙන්නේ'],
    ['Rs. 12.00', 'Limit නැතුව photo upload කරලා ප්‍රශ්න අහන්න දැන් හැකියි – එක photo එකකට රු 12ක්'],
    ['Free for Pro Users', 'ඔයාගේ Account Balance එක රු 10ට වඩා තියෙනවා නම් Graph Generating Free'],
    ['Pro User Benefit', 'Account balance එක රු 100ට වඩා තියෙනවා නම්:\n- Google Image Suggestion\n- YouTube Video Suggestion\n- Access to Advanced Models'],
    ['Pro Access (Rs. 50+)', 'MCQ Game සහ Educational AI Game වලට access කරන්න පුලුවන්']
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-sm font-medium border border-gray-200 dark:border-gray-700">
              Choose your limits
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            අපිලගේ Budget එකට ගැලපෙන්න තෝරන්න
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            මාසේ ගානේ ගෙවලා එපා වෙලාද? මෙන්න විසඳුම, ඔයාට ගන්න ඕන Credit ගාන තෝරලා Recharge කරන්න.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {isLoggedIn && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Choose Your Price</h3>
              
              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-red-500">
                  {utils.form.formatLKR(priceValue)}
                </span>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>200 LKR</span>
                  <span>10000 LKR</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button 
                onClick={handleRecharge}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Recharge</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Pricing Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Pricing / Condition</th>
                  <th className="px-6 py-4 text-left">Feature / Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {pricingData.map(([condition, benefit], index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{condition}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-pre-line">{benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  🎁 New users will get Rs. 30 Welcome Credit
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  🕓 ඔබ purchase කරන credit lifetime valid වේ! භාවිතා කරලා ඉවර උනාම ආපහු Recharge කරන්න පුලුවන්.
                </p>
                <Link
                  href="https://blog.apilageai.lk/2025/04/pricing.html"
                  target="_blank"
                  className="inline-block text-red-500 hover:text-red-600 font-medium text-sm"
                >
                  Learn More / තව දැනගන්න
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
