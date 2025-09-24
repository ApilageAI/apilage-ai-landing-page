'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface AboutSectionProps {
  isLoggedIn?: boolean;
}

export default function AboutSection({ isLoggedIn = false }: AboutSectionProps) {
  const benefits = [
    'Developed by Sri Lankan developers for local contexts',
    'Trained to to all kind of tasks',
    'Continuously improved through user feedback',
    'Optimized for Sri Lankan syllabus and education system',
    'සිංහල භාෂාව හොදටම පුලුවන් 😉',
    'Additional explaining in subjects with images and graphs'
  ];

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 relative">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow-lg">
                  <Image
                    src="/images/icon.png"
                    alt="Apilage AI Logo"
                    width={150}
                    height={150}
                    className="rounded-xl"
                  />
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Your data is secured.</p>
                  <p>All pricing plans are <strong>Pay-As-You-Go</strong>.</p>
                  <p><strong>No subscriptions required:</strong> just pay when you need to use it.</p>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇱🇰</span>
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">ලංකාවේ අපි වෙනුවෙන්</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">ApilageAI</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">අපිව අදුරන Apilage Intelligence</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Made in Sri Lanka</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-sm font-medium border border-gray-200 dark:border-gray-700">
                About Our AI
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              ලංකාවේ අපි වෙනුවෙන්, අපි හැමෝටම 🇱🇰
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Apilage AI කියන්නේ ශ්‍රී ලංකාවේ හදපු සිංහල AI agent කෙනෙක්.  Apilage AI හරහා, ඔබට ශ්‍රී ලාංකික විෂය නිර්දේශය මත පදනම්ව සියලුම උසස් පෙළ සහ සාමාන්‍ය පෙළ විෂයයන් සඳහා සහාය ලබා ගත හැකිය. එය ප්‍රස්ථාර, රූප සහ PDF සමඟ පැහැදිලි කිරීම් ද සපයයි. මීට අමතරව Image Genaration වැනි දේ සමගද ඔබට සහය ලබා ගත හැක. AI හි premium අත්දැකීම ලබා ගැනීමට ලොකු මුදලක් ගෙවන්නේ ඇයි? Apilage AI තමා සුපිරිම ! ඔයාගේ භාෂාවෙන් AI premium අත්දෑකීම ගන්න ඔන්න දැන් අවස්ථාව.
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>

            <Link
              href={isLoggedIn ? "/app" : "/auth/login"}
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              අදම Try කරන්න
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
