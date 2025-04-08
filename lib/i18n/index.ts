import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from './translations';
import { formatters } from './formatters';
import { getLocaleData } from './localeData';

// Create i18n instance
const i18n = new I18n(translations);

// Set the locale
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Initialize formatters for the current locale
formatters.init(i18n.locale);

// Load locale data for the current locale
getLocaleData(i18n.locale);

export { i18n };

// Utility functions for formatting
export const format = {
  date: (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return formatters.date.format(date, options);
  },
  number: (number: number, options?: Intl.NumberFormatOptions) => {
    return formatters.number.format(number, options);
  },
  currency: (amount: number, currency: string) => {
    return formatters.currency.format(amount, currency);
  },
  relative: (date: Date) => {
    return formatters.relative.format(date);
  },
  list: (items: string[]) => {
    return formatters.list.format(items);
  },
};

// Hook for accessing translations and locale data
export function useI18n() {
  return {
    t: (key: string, options?: any) => i18n.t(key, options),
    locale: i18n.locale,
    format,
    isRTL: Localization.isRTL,
  };
}