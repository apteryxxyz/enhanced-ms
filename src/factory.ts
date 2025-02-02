import { formatMilliseconds } from './format';
import type { FormatOptions } from './format/helpers/resolve-options';
import type { languages } from './languages';
import type { LanguageDefinition } from './languages/helpers/definition-types';
import { getLanguage } from './languages/helpers/make-language';
import { parseDuration } from './parse';
import type { ParseOptions } from './parse/helpers/resolve-options';

export interface CreateMsOptions {
  /**
   * The language to use for formatting and parsing.
   *
   * @default 'en'
   */
  language?: keyof typeof languages | LanguageDefinition;

  /**
   * Default formatting options for the `ms` function.
   */
  formatOptions?: FormatOptions;

  /**
   * Default parsing options for the `ms` function.
   */
  parseOptions?: ParseOptions;
}

export type Ms = {
  /**
   * Formats a duration from milliseconds into a human-readable duration string.
   *
   * @param milliseconds The duration in milliseconds to format
   * @param options Optional formatting options
   * @returns A formatted duration string (e.g., "1 hour, 30 minutes") or `null` if the duration is invalid
   *
   * @example
   * ms(90061); // "1 minute 30 seconds"
   * ms(90061, { includeMs: true }); // "1 minute 30 seconds 10 milliseconds"
   * ms(90061, { formatStyle: 'short' }); // "1m 30s"
   * ms(90061, { insertAnd: true }); // "1 minute and 30 seconds"
   * ms(90061, { insertCommas: true }); // "1 minute, 30 seconds"
   * ms(90061, { firstUnitOnly: true }); // "1 minute"
   */
  (milliseconds: number, options?: FormatOptions): string | null;

  /**
   * Parses a human-readable duration string into milliseconds.
   *
   * @param duration The duration string to parse (e.g., "2h 30m", "1 day, 5 hours")
   * @param options Optional parsing options
   * @returns The parsed duration in milliseconds
   *
   * @example
   * ms("1 minute 30 seconds"); // 90061
   * ms("1m 30s"); // 90061
   */
  (duration: string, options?: ParseOptions): number;
};

/**
 * Creates a function to format and parse time durations.
 *
 * @param options Configuration options for language, formatting, and parsing
 * @returns A function that can format a number into a human-readable duration string or parse a duration string into milliseconds
 *
 * @example
 * const ms = createMs({ language: 'en' });
 * ms(900000); // "15 minutes" (formatted in English)
 * ms("15 minutes"); // 900000 (parsed into milliseconds)
 *
 * @example
 * const deMs = createMs({ language: 'de' });
 * deMs(900000); // "15 Minuten" (formatted in German)
 * deMs("15 minuten"); // 900000 (parsed into milliseconds)
 */
export function createMs(options: CreateMsOptions = {}): Ms {
  const language = getLanguage(options.language ?? 'en');
  const defaultFormatOptions = options.formatOptions ?? {};
  const defaultParseOptions = options.parseOptions ?? {};

  function ms(milliseconds: number, options?: FormatOptions): string | null;
  function ms(duration: string, options?: FormatOptions): number;

  function ms(...args: [number, FormatOptions?] | [string, FormatOptions?]) {
    switch (typeof args[0]) {
      case 'number': {
        const [milliseconds, additionalOptions] = args;
        if (Number.isNaN(milliseconds) || !Number.isFinite(milliseconds))
          throw new TypeError('Expected a finite number');
        const formatOptions = { ...defaultFormatOptions, ...additionalOptions };
        return formatMilliseconds(milliseconds, language, formatOptions);
      }

      case 'string': {
        const [duration, additionalOptions] = args;
        const parseOptions = { ...defaultParseOptions, ...additionalOptions };
        return parseDuration(duration, language, parseOptions);
      }

      default:
        throw new TypeError('Expected a finite number or a string');
    }
  }

  return ms;
}
