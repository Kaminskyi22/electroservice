'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import { FaPhone, FaBolt, FaTools, FaShieldAlt, FaTelegram } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const floatingIcons = [
  { Icon: FaBolt, x: '20%', y: '20%', delay: 0 },
  { Icon: FaTools, x: '80%', y: '30%', delay: 0.5 },
  { Icon: FaShieldAlt, x: '15%', y: '70%', delay: 1 },
  { Icon: FaBolt, x: '70%', y: '80%', delay: 1.5 },
  { Icon: FaTools, x: '40%', y: '25%', delay: 2 },
  { Icon: FaShieldAlt, x: '85%', y: '60%', delay: 2.5 },
];

const START_COUNT = 107; // початкове значення
const INCREMENT_MINUTES = 7;
const STORAGE_KEY = 'electro_counter_start_date';

function getStartDate() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return new Date(saved);
    const now = new Date();
    localStorage.setItem(STORAGE_KEY, now.toISOString());
    return now;
  }
  return new Date();
}

function getCurrentCount(startDate: Date) {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  return START_COUNT + Math.floor(diffMinutes / INCREMENT_MINUTES);
}

export default function Hero() {
  const { messages } = useTranslation();
  const [count, setCount] = useState(START_COUNT);

  useEffect(() => {
    const startDate = getStartDate();
    setCount(getCurrentCount(startDate));
    const interval = setInterval(() => {
      setCount(getCurrentCount(startDate));
    }, 60 * 1000); // оновлювати кожну хвилину
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-0 pt-[max(24px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
      {/* Основний фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-500 to-blue-900">
        <div className="absolute left-1/4 top-1/4 w-1/2 h-1/3 bg-blue-400/60 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 w-1/3 h-1/4 bg-blue-200/40 rounded-full blur-2xl" />
      </div>
      
      {/* Анімовані іконки */}
      {floatingIcons.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-white/10 pointer-events-none"
          style={{ left: x, top: y, willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="text-6xl md:text-7xl drop-shadow-xl" />
        </motion.div>
      ))}

      {/* Світлові ефекти */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.07) 0%, transparent 30%),
              radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.07) 0%, transparent 30%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.07) 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%'
          }}
        />
      </div>

      {/* Контент */}
      <div className="container mx-auto px-0 sm:px-4 z-20 relative flex flex-col items-center justify-center w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative w-full"
        >
          {/* Логотип */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <span
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl bg-clip-text"
              style={{textShadow: '0 4px 24px rgba(0,0,0,0.5)'}}
              aria-label="ElectroService логотип"
            >
              Electro
              <span className="text-blue-200 drop-shadow-2xl">Service</span>
            </span>
            <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-2 rounded-full" />
            <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl border border-white/40 animate-pulse"
              >
                <FaBolt className="text-blue-600 text-xl sm:text-2xl drop-shadow" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 drop-shadow">{count}</span>
                <span className="text-blue-900 text-base sm:text-lg md:text-xl font-semibold ml-2 drop-shadow">виконаних робіт</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 relative"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping" />
            <div className="relative w-full h-full bg-blue-600 rounded-full flex items-center justify-center">
              <FaBolt className="text-3xl sm:text-4xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
            {messages.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8 text-blue-200 drop-shadow-md">
            {messages.hero.subtitle}
          </p>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto text-gray-300">
            {messages.hero.description}
          </p>
          <div className="text-center mb-6 sm:mb-8">
            <a href="#services" className="text-blue-200 underline hover:text-white font-semibold transition">Детальніше про послуги</a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch px-0 sm:px-2 mt-4 sm:mt-6 w-full">
            <motion.a
              href={`tel:${messages.contact.phone}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/95 backdrop-blur-md text-blue-900 font-semibold py-3 sm:py-5 px-2 sm:px-10 rounded-full text-base sm:text-lg transition-all shadow-2xl border border-white/60 relative overflow-hidden group min-w-0"
              style={{ minWidth: 0 }}
            >
              <FaPhone className="text-lg sm:text-xl relative z-10 text-blue-600 drop-shadow" aria-label="Телефон" />
              <span className="relative z-10 whitespace-nowrap drop-shadow">{messages.contact.phone}</span>
            </motion.a>

            <motion.a
              href="https://t.me/electroservice_bot"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/95 backdrop-blur-md text-blue-900 font-semibold py-3 sm:py-5 px-2 sm:px-10 rounded-full text-base sm:text-lg transition-all shadow-2xl border border-white/60 relative overflow-hidden group min-w-0"
              style={{ minWidth: 0 }}
            >
              <FaTelegram className="text-lg sm:text-xl relative z-10 text-blue-600 drop-shadow" aria-label="Telegram" />
              <span className="relative z-10 whitespace-nowrap drop-shadow">Швидка допомога в Telegram</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 