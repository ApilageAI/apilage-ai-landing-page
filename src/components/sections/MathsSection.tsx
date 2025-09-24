'use client';

import React from 'react';
import Image from 'next/image';

export default function MathsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 space-y-16">
        {/* First Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <Image
              src="/images/preview1.png"
              alt="Maths related image"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              ලංකාවේ හොදම සිංහල AI අත්දැකීම
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              ලංකාවේ එතෙක් මෙතෙක් හදපු AI chats bots වලින් හොදම අත්දැකීමක් අපිලගේ AI එකෙන් ඔබට ලබා ගන්න පුළුවන්. ApilageAI v-1 Model එකෙහි ඇති better understanding සහ native සිංහල (සිංහල කතන භාෂාව) වඩා හොදින් භාවිතා කිරීමට ඇති හැකියාව නිසා 
              ඉතාමත් ඉහල සාර්ථකත්වයක් සහිතව ඔබේ ප්‍රශ්න වලට පිළිතුරු ලබා දිය හැකිය. තවත් විශේෂත්වයක් වන්නේ මෙය ලංකාවේ උසස්පෙළ සාමාන්‍යපෙළ syllabus වලට අනුකූලව උදව් කිරීමට හුරු වී ඇත.
            </p>
          </div>
        </div>

        {/* Second Section - Reversed */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="flex-1">
            <Image
              src="/images/preview-2.png"
              alt="Deep Research and Google Search"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Deep Research හා Google Search
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              ලංකාවේ ප්‍රථම වතාවට AI Helper එකක් සිංහල බසින් තත් කාලීන (Real-Time) Google Search Analyse කර ඔබට උදව් කරන පළමු අවස්ථාව මෙයයි. මෙය විශේෂ වන්නේ ලංකාවේ Web-Resouces භාවිතා කරන බැවින් අධ්‍යාපනික මෙන්න භාහිර Search සදහාද ඉතාමත් ඉහල නිරවද්‍ය Responses ලබා දෙයි. Apilage AI එකේ Search Intelligence එක නිසා ඔබට අහන ඕනම ප්‍රශ්නයකට ලංකාවේ Reasources වලින් හරියටම ගැලපෙන information තෝරලා ඔයාට කියන්න Apilage Ai වලට පුලුවන්.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
