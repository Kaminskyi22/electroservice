'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import { FaHome, FaTools, FaBolt, FaLightbulb } from 'react-icons/fa';

const icons = {
  home: FaHome,
  tools: FaTools,
  bolt: FaBolt,
  light: FaLightbulb,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Services() {
  const { messages } = useTranslation();

  return (
    <section id="services" className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900"
        >
          {messages.services.title}
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {messages.services.items.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <motion.div
                key={index}
                variants={item}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <Icon className="text-2xl sm:text-3xl text-blue-600" aria-label={service.title} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-2 sm:mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-800 text-center text-sm sm:text-base">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 