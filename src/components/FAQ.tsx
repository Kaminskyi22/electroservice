"use client";

import { useTranslation } from '@/contexts/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type FaqItem = { question: string; answer: string };

export default function FAQ() {
  const { messages } = useTranslation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-12 sm:py-20 px-2 sm:px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto bg-white/95 shadow-xl rounded-2xl p-3 sm:p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-black">
            {messages.faq.title}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {(messages.faq.items as unknown as FaqItem[]).map((item, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden bg-gray-50">
                <button
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-left text-base sm:text-lg font-semibold text-gray-900 focus:outline-none focus:bg-blue-100 transition"
                  onClick={() => setOpen(open === idx ? null : idx)}
                  aria-expanded={open === idx}
                >
                  <h3 className="text-base sm:text-lg font-semibold">{item.question}</h3>
                  <FaChevronDown className={`ml-2 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === idx && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="relative px-0"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r" />
                      <div className="pl-4 pr-4 sm:pl-6 sm:pr-6 pb-4 pt-2 bg-blue-100 text-gray-800 text-sm sm:text-base">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          {item.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 