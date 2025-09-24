'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  MessageCircle, 
  Layers, 
  Shield, 
  Zap, 
  Users 
} from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Globe,
    title: '100% අපේ දෙයක්',
    description: 'අපිලගේ Ai කියන්නේ ලංකාවේ පළෙවනි multitasking Ai agent කියලා ඔයලා දන්නවද?',
  },
  {
    icon: MessageCircle,
    title: 'මේකේ තියෙන විශේෂත්වය මොකක්ද?',
    description: 'අපිළගේ AI එකේ තියන Search Intelligence එක නිසා ඔයා අහන ඕනම ප්‍රශ්නයකට ලංකාවේ Reasources වලින් හරියටම ගැලපෙන information තෝරලා ඔයාට කියන්න Apilage Ai වලට පුලුවන්',
  },
  {
    icon: Layers,
    title: 'Apilage AI මතකය',
    description: 'ඔයා Apilage AI එක්ක කරන හැම converstation එකක් ගැනම Apilage AI වලට හොද අවබෝධයක් තියනවා. ඒ හින්දා වඩා හොද reponses දෙන්න අපිලගේ Ai වලට පුලුවන්',
  },
  {
    icon: Shield,
    title: 'Privacy කේස් නම් කොහෙත්ම නෑ',
    description: 'ඔයාලගේ Data 100% secured, ඒක නිසා කොහෙත්ම බය වෙන්න එපා තව දැනගන්න ඕන නම් privacypolicy කියවන්න',
  },
  {
    icon: Zap,
    title: 'Updative technology එක නිසා සුපිරී',
    description: 'අපේ users ලා හැමදෙම Updative තියගන්න එක ApilageAi අපේ වගකීම ඒන හින්දා ඔයාලට ගැලපෙන අලුත් Updates කලට වෙලාවට Relase කරනවා',
  },
  {
    icon: Users,
    title: 'අපිත් එක්ක ඉන්න ඔයාලගේ අදහස් වලින්..',
    description: 'අපිලගේ Ai ඉස්සරහට Develop කරන් යන්න ඔයාලගේ අදහස් අපිට කියන්න Whatsapp Channel / Discord',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium border border-gray-200 dark:border-gray-700">
              Advanced Capabilities
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Powerful Features Designed for Sri Lanka
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI model comes with a set of features specifically optimized for Sri Lankan Students,
            Researchers, and Tech-community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
