import { MeasurementKey, measurements } from './measurements';

import de from './locales/de';
import en from './locales/en';
import mi from './locales/mi';

export const languages = { en, de, mi };
export type LanguageKey = keyof typeof languages;
/** Check if a value is a language key. */
export function isLanguageKey(value: unknown): value is LanguageKey {
  return typeof value === 'string' && value in languages;
}

export interface Language {
  /** The version of 'and' in this language. */
  and: string | ((words: string[]) => string);
  /** The decimal separator this language uses. */
  decimal: '.' | ',';
  /** Measurement units. */
  units: Unit[];
}

export interface Unit {
  /** Key to identify this unit. */
  key: MeasurementKey;
  /** Long form of the measurement. */
  name: string | ((count: number) => string);
  /** Short form of the measurement. */
  abbreviation?: string | ((count: number) => string);
  /** Strings used for the string regex. */
  matches: string[];
}

export interface LanguageOptions {
  /** The key for the selected language. */
  key: LanguageKey;
  /** The version of 'and' in the language. */
  andValue: string | ((words: string[]) => string);
  /** The decimal separator the language uses. */
  decimalSeparator: string;
  /** The thousands separator the language uses. */
  thousandsSeparator: string;
  /** Whether the language has full short support. */
  supportsAbbreviations: boolean;
  /** The regex to match lengths of time. */
  matcherRegex: RegExp;
  /** The units and their names in the language, as a map. */
  units: Record<string, Unit & { ms: number }>;
}

const makeLanguageOptionsCache = new Map<LanguageKey, LanguageOptions>();

/** Convert a language object into a object this module can utilities. */
export function makeLanguageOptions(key: LanguageKey): LanguageOptions {
  const language = languages[key];
  if (!language) throw new Error(`Language for key "${key}" not found`);

  const andValue = language.and;
  const decimalSeparator = language.decimal;
  const thousandsSeparator = decimalSeparator === '.' ? ',' : '.';

  const matcherRegex = new RegExp(
    // biome-ignore lint/style/useTemplate: Better readability
    '[-+*/]+|' + // Operators
      '[()]|' + // Brackets
      `(?![${decimalSeparator}${thousandsSeparator}])` + // Don't match single .,
      `[\\d${decimalSeparator}${thousandsSeparator}]+|` + // Numbers
      '(?<=\\s|\\d)(' + // Units
      language.units
        .flatMap(({ matches }) => matches)
        .sort((a, b) => b.length - a.length)
        .join('|') +
      ')',
    'gi',
  );

  // Turn the units array into a map where every key is a match
  // This saves having to 'find' a match manually
  // `units.find(u => u.matches.includes(value))` vs `units[value]`
  const units = language.units.reduce<LanguageOptions['units']>((all, cur) => {
    for (const match of [...cur.matches, cur.key])
      all[match] = Object.assign(cur, { ms: measurements[cur.key] });
    return all;
  }, {});

  return {
    key,
    decimalSeparator,
    thousandsSeparator,
    supportsAbbreviations: language.units //
      .every((unit) => 'abbreviation' in unit),
    andValue,
    matcherRegex,
    units,
  };
}

/** Get the language options for a language. */
export function getLanguageOptions(key: LanguageKey): LanguageOptions {
  let options = makeLanguageOptionsCache.get(key);
  if (!options) {
    options = makeLanguageOptions(key);
    makeLanguageOptionsCache.set(key, options);
  }
  return options;
}

/** The default language to use, in this case English. */
export const defaultLanguageOptions = makeLanguageOptions('en');
