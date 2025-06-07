'use client';

import { createContext, useContext } from 'react';
import { uk } from '@/translations/uk';

interface TranslationContextType {
  locale: string;
  messages: typeof uk;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export default TranslationContext; 