import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-listformat/polyfill';

export async function getLocaleData(locale: string) {
  const [language] = locale.split('-');

  try {
    // Load plural rules
    await import(`@formatjs/intl-pluralrules/locale-data/${language}`);

    // Load number format
    await import(`@formatjs/intl-numberformat/locale-data/${language}`);

    // Load relative time format
    await import(`@formatjs/intl-relativetimeformat/locale-data/${language}`);

    // Load date time format
    await import(`@formatjs/intl-datetimeformat/locale-data/${language}`);

    // Load list format
    await import(`@formatjs/intl-listformat/locale-data/${language}`);
  } catch (error) {
    console.warn(`Failed to load locale data for ${language}`, error);
  }
}