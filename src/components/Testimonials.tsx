'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

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

function shuffleArray<T>(array: ReadonlyArray<T>): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Testimonials() {
  const { messages } = useTranslation();
  const [shuffled, setShuffled] = useState(() => shuffleArray(messages.testimonials.items));

  useEffect(() => {
    setShuffled(shuffleArray(messages.testimonials.items));
    // eslint-disable-next-line
  }, []);

  const visible = shuffled.slice(0, 3);

  return (
    <section id="testimonials" className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-black"
        >
          {messages.testimonials.title}
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {visible.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white/95 rounded-xl p-4 sm:p-6 shadow-lg flex flex-col h-full"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-lg sm:text-xl font-semibold text-blue-600">
                    {testimonial.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-black text-base sm:text-lg">{testimonial.name}</h3>
                  <div className="flex text-blue-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} aria-label={`Зірка ${i + 1} з ${testimonial.rating}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-black italic text-sm sm:text-base">&quot;{testimonial.text}&quot;</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <a href="#contact" className="text-blue-600 hover:underline font-semibold transition">Залиште свій відгук або зв&apos;яжіться з нами</a>
        </div>
      </div>
    </section>
  );
} 