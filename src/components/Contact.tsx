'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBolt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const { messages } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [powered, setPowered] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('loading');
      setPowered(false);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setPowered(true);
      reset();
      alert(messages.contact.form.success);
      setTimeout(() => setPowered(false), 2000);
    } catch {
      setStatus('error');
      setPowered(false);
      alert(messages.contact.form.error);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-black">
            {messages.contact.title}
          </h2>
          <p className="text-base sm:text-xl text-black">
            {messages.contact.subtitle}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <FaPhone className="text-blue-600 text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-black" aria-label="Телефон">Телефон</h3>
                <a href={`tel:${messages.contact.phone}`} className="text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                  {messages.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <FaEnvelope className="text-blue-600 text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-black" aria-label="Email">Email</h3>
                <a href={`mailto:${messages.contact.email}`} className="text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                  {messages.contact.email}
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <FaMapMarkerAlt className="text-blue-600 text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-black" aria-label="Адреса">Адреса</h3>
                <p className="text-black text-sm sm:text-base">{messages.contact.address}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/95 rounded-xl p-4 sm:p-8"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ rotate: powered ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="text-3xl sm:text-4xl text-blue-600"
              >
                <FaBolt />
              </motion.div>
            </div>
            <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-black" aria-label="Форма зворотного зв&apos;язку">{messages.contact.form.title}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {messages.common.name}
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm sm:text-base ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">Це поле обов&apos;язкове</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {messages.common.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', { 
                    required: true,
                    pattern: {
                      value: /^\+?[0-9]{10,12}$/,
                      message: 'Введіть коректний номер телефону'
                    }
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm sm:text-base ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message || 'Це поле обов&apos;язкове'}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {messages.common.message}
                </label>
                <textarea
                  id="message"
                  {...register('message', { required: true })}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm sm:text-base ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">Це поле обов&apos;язкове</p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors text-base sm:text-lg ${
                  status === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {status === 'loading' ? 'Відправляємо...' : messages.common.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 