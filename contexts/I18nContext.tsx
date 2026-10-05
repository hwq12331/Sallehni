import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import en from '@/locales/en';
import ar from '@/locales/ar';

type TranslationMap = Record<string, string>;

type I18nContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
  toggleLocale: () => void;
  dateFormat: string;
  isHijri: boolean;
  toggleCalendarType: () => void;
};

const defaultValue: I18nContextType = {
  locale: 'ar',
  setLocale: () => {},
  t: (key: string) => key,
  isRTL: true,
  toggleLocale: () => {},
  dateFormat: 'hijri',
  isHijri: true,
  toggleCalendarType: () => {},
};

export const I18nContext = createContext<I18nContextType>(defaultValue);

type I18nProviderProps = {
  children: ReactNode;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState('ar');
  const [isRTL, setIsRTL] = useState(true);
  const [dateFormat, setDateFormat] = useState('hijri');
  const [isHijri, setIsHijri] = useState(true);

  useEffect(() => {
    // Set the initial locale based on device settings, but default to Arabic for this app
    const deviceLocale = Localization.locale.split('-')[0];
    const initialLocale = deviceLocale === 'ar' ? 'ar' : 'ar'; // Default to Arabic
    setLocale(initialLocale);
    
    // Set RTL based on locale
    const shouldBeRTL = initialLocale === 'ar';
    setIsRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    setLocale(newLocale);
    setIsRTL(newLocale === 'ar');
    I18nManager.forceRTL(newLocale === 'ar');
  };

  const toggleCalendarType = () => {
    setDateFormat(dateFormat === 'hijri' ? 'gregorian' : 'hijri');
    setIsHijri(!isHijri);
  };

  const t = (key: string): string => {
    const translations = locale === 'ar' ? ar as TranslationMap : en as TranslationMap;
    return translations[key] || key;
  };

  return (
    <I18nContext.Provider 
      value={{ 
        locale, 
        setLocale, 
        t, 
        isRTL, 
        toggleLocale, 
        dateFormat, 
        isHijri, 
        toggleCalendarType 
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};