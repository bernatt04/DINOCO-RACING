// components/HeroSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/grand.webp)' }}
    >
      {/* Overlay to darken the background and highlight the content */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        {/* Animated Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to Dynoco Racing!
        </motion.h1>

        {/* Enhanced Subtitle */}
        <motion.p
          className="text-lg md:text-2xl text-white mb-8 max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Experience the thrill, speed, and passion of karting like never before. Join our team and redefine the race.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            href="/join"
            className="bg-[#ff8049] hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300"
          >
            Join us now
          </Link>
          <Link
            href="/about"
            className="border border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-[#ff8049] transition duration-300"
          >
            More Info
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
