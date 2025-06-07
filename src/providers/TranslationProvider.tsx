'use client';

import { IntlProvider } from 'react-intl';
import { flattenMessages } from '@/utils/flattenMessages';
import { uk } from '@/translations/uk';
import TranslationContext from '@/contexts/TranslationContext';
import { ReactNode } from 'react';

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const flatMessages = flattenMessages(uk);

  return (
    <TranslationContext.Provider value={{ locale: 'uk', messages: uk }}>
      <IntlProvider messages={flatMessages} locale="uk" defaultLocale="uk">
        {children}
      </IntlProvider>
    </TranslationContext.Provider>
  );
} 