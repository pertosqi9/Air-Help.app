import {
  IntlDateTimeFormat,
  IntlNumberFormat,
  IntlRelativeTimeFormat,
  IntlListFormat,
} from '@formatjs/intl';

class Formatters {
  date: Intl.DateTimeFormat;
  number: Intl.NumberFormat;
  currency: Intl.NumberFormat;
  relative: Intl.RelativeTimeFormat;
  list: Intl.ListFormat;

  init(locale: string) {
    this.date = new IntlDateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.number = new IntlNumberFormat(locale);

    this.currency = new IntlNumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
    });

    this.relative = new IntlRelativeTimeFormat(locale, {
      numeric: 'auto',
      style: 'long',
    });

    this.list = new IntlListFormat(locale, {
      style: 'long',
      type: 'conjunction',
    });
  }
}

export const formatters = new Formatters();