import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Locale } from '../data/lessons';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<Locale>('qu');

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider.');
  }

  return context;
};
