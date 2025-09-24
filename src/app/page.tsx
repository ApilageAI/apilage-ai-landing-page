'use client';

import React, { useEffect } from 'react';
import { utils } from '../lib/utils';
import { BlogSection } from '../components/BlogSection';

// Import all sections
import {
  HeroSection,
  LookSection,
  MathsSection,
  AboutSection,
  FeaturesSection,
  PricingSection,
  PartnersSection
} from '../components/sections';

// Import modals and banners
import { WelcomeModal } from '../components/modals';
import { CookieBanner } from '../components/banners';

// Types
interface LandingPageProps {
  isLoggedIn?: boolean;
  user?: {
    name?: string;
    avatar?: string;
    balance?: number;
  };
}

export default function LandingPage({ isLoggedIn = false, user }: LandingPageProps) {
  // Initialize theme on mount
  useEffect(() => {
    utils.theme.initializeTheme();
  }, []);

  // Handle anchor link clicks
  const handleAnchorClick = (href: string) => {
    if (href.startsWith('#')) {
      utils.animation.scrollToElement(href);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Welcome Modal */}
      <WelcomeModal />
      
      {/* Cookie Banner */}
      <CookieBanner />

      {/* Hero Section */}
      <HeroSection isLoggedIn={isLoggedIn} />

      {/* Look Section - Rotating Content */}
      <LookSection />

      {/* Maths Sections */}
      <MathsSection />

      {/* About Section */}
      <AboutSection isLoggedIn={isLoggedIn} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection isLoggedIn={isLoggedIn} />

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium border border-gray-200 dark:border-gray-700">
                Updates
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Latest Insights & Updates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay informed about the latest developments in AI technology for Sri Lanka
              and discover how our solutions are making an impact.
            </p>
          </div>

          <BlogSection className="mb-12" />

          <div className="text-center">
            <a
              href="https://apilageai.lk/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
            >
              View All Articles
            </a>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}