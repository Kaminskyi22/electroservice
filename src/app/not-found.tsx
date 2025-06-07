'use client';

import { motion } from 'framer-motion';
import { FaHome, FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-500 to-blue-900">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <FaLock className="text-6xl text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-8"
        >
          Сторінку не знайдено
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/80 mb-8 max-w-md mx-auto"
        >
          Схоже, що сторінка, яку ви шукаєте, не існує або була переміщена.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-blue-900 font-semibold py-3 px-6 rounded-lg transition-all hover:bg-white/90"
          >
            <FaHome className="text-lg" />
            На головну
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white font-semibold py-3 px-6 rounded-lg transition-all hover:bg-white/30"
          >
            <FaLock className="text-lg" />
            Зв&apos;язатися з нами
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 