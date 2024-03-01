import { type FormatOptions, defaultFormatOptions, format } from './format';
import {
  type LanguageKey,
  getLanguageOptions,
  isLanguageKey,
} from './languages';
import { type ParseOptions, defaultParseOptions, parse } from './parse';

/**
 * Convert milliseconds to a human readable string.
 * @param input Number of milliseconds.
 * @param options Options for formatting.
 * @example
 * ms(13572468) // => '3 hours 46 minutes and 12 seconds'
 *
 * ms(13572468, { includeMs: true }) // => '3 hours 46 minutes 12 seconds and 468 milliseconds'
 * ms(13572.468, { includeSubMs: true }) // => '13 seconds 572 milliseconds and 468 microseconds'
 *
 * ms(13572468, { roundUp: true }) // => '4 hours'
 * ms(13572468, { shortFormat: true }) // => '3h 46m 12s'
 * ms(13572468, { insertCommas: true }) // => '3 hours, 46 minutes, and 12 seconds'
 */
function ms(input: number, options?: FormatOptions): ReturnType<typeof format>;

/**
 * Convert milliseconds to a human readable string.
 * @param input Number of milliseconds.
 * @param language Language key.
 * @param options Options for formatting.
 * @example
 * ms(13572468, 'mi') // => '3 hāora 46 meneti me te 12 hēkona'
 *
 * ms(13572468, 'mi', { includeMs: true }) // => '3 hāora 46 meneti 12 hēkona me te 468 hēkona miri'
 * ms(13572.468, 'mi', { includeSubMs: true }) // => '13 hēkona 572 hēkona miri me te 468 hēkona miriona'
 *
 * ms(13572468, 'mi', { roundUp: true }) // => '4 hāora'
 * ms(13572468, 'mi', { shortFormat: true }) // => '3 hāora 46 meneti me te 12 hēkona'
 * ms(13572468, 'mi', { insertCommas: true }) // => '3 hāora, 46 meneti, me te 12 hēkona'
 */
function ms(
  input: number,
  language: LanguageKey,
  options?: FormatOptions,
): ReturnType<typeof format>;

/**
 * Parse a human readable timeframe string to milliseconds.
 * @param input Timeframe string.
 * @param options Options for parsing.
 * @example
 * ms('2 seconds') // => 2000
 * ms('2 minutes and 30 seconds') // => 150000
 * ms('1.5 days and 1.5 hours') // => 135000000
 *
 * ms('2 hours - 30 minutes') // => 5400000
 * ms('1 day * 365') // => 31536000000
 * ms('1.5 days + 1.5 hours') // => 135000000
 *
 * ms('1 week - 3 days * 2') // => 86400000
 * ms('(1 week - 3 days) * 2') // => 691200000
 */
function ms(input: string, options?: ParseOptions): ReturnType<typeof parse>;

/**
 * Parse a human readable timeframe string to milliseconds.
 * @param input Timeframe string.
 * @param language Language key.
 * @param options Options for parsing.
 * @example
 * ms('2 hēkona') // => 2000
 * ms('2 meneti me te 30 hēkona') // => 150000
 * ms('1.5 ra me te 1.5 hāora') // => 135000000
 *
 * ms('2 hāora - 30 meneti') // => 5400000
 * ms('1 rangi * 365') // => 31536000000
 * ms('1.5 ra + 1.5 hāora') // => 135000000
 *
 * ms('1 wiki - 3 ra * 2') // => 86400000
 * ms('(1 wiki - 3 ra) * 2') // => 691200000
 */
function ms(
  input: string,
  language: LanguageKey,
  options?: ParseOptions,
): ReturnType<typeof parse>;

/**
 * Create a new instance with a new default language.
 * @param language Language key.
 * @example
 * const ms = require('enhanced-ms')('mi');
 * ms(2000) // => '2 hēkona'
 * @example
 * const ms = require('enhanced-ms');
 * ms(2000) // => '2 seconds'
 * const newMs = ms('mi');
 * newMs(2000) // => '2 hēkona'
 */
function ms(language: LanguageKey): typeof ms;

/**
 * Create a new instance with new default options.
 * @param options Options for parsing and formatting.
 * @example
 * const ms = require('enhanced-ms')({ roundUp: true });
 * ms(13572468) // => '4 hours'
 * @example
 * const ms = require('enhanced-ms');
 * ms(13572468) // => '3 hours 46 minutes and 12 seconds'
 * const newMs = ms({ roundUp: true });
 * newMs(13572468) // => '4 hours'
 */
function ms(options: FormatOptions & ParseOptions): typeof ms;

function ms(
  ...upperArgs: [
    arg0: number | string | LanguageKey | (FormatOptions & ParseOptions),
    arg1?: LanguageKey | (FormatOptions | ParseOptions),
    arg2?: FormatOptions | ParseOptions,
  ]
) {
  // Move the options to the end
  if (typeof upperArgs[1] === 'object')
    (upperArgs[2] = upperArgs[1]), (upperArgs[1] = undefined);

  const hasDefaultLanguage = isLanguageKey(upperArgs[0]);
  const hasDefaultOptions = typeof upperArgs[0] === 'object';

  if (hasDefaultLanguage || hasDefaultOptions) {
    // Create a new instance with the new default language or options
    return ((...lowerArgs: unknown[]) => {
      // Move the options to the end
      if (typeof lowerArgs[1] === 'object')
        (lowerArgs[2] = lowerArgs[1]), (lowerArgs[1] = undefined);

      // Apply the default language only if no language was provided
      if (!lowerArgs[1] && hasDefaultLanguage) lowerArgs[1] = upperArgs[0];

      // Merge the default options with the provided options
      lowerArgs[2] = mergeOptions(
        hasDefaultOptions ? upperArgs[0] : {},
        upperArgs[2] ?? {},
        lowerArgs[2] ?? {},
      );

      return ms(...(lowerArgs as Parameters<typeof ms>));
    }) as typeof ms;
  }

  const input = upperArgs[0] as string | number;
  const languageOptions = getLanguageOptions(upperArgs[1] ?? 'en');
  const resolvedOptions = formatOptions(upperArgs[2] ?? {});

  if (typeof input === 'number') {
    if (Number.isNaN(input) || !Number.isFinite(input))
      throw new TypeError('Expected a finite number');
    return format(input, resolvedOptions, languageOptions);
  } else if (typeof input === 'string') {
    return parse(input, resolvedOptions, languageOptions);
  }

  throw new TypeError('Expected a string or number');
}

export default Object.assign(ms, { format, parse });
export type { FormatOptions, ParseOptions };

// HELPERS

function mergeOptions(...options: (FormatOptions | ParseOptions)[]) {
  if (options.length <= 1) return options[0] ?? {};
  return options.reduce((mergedOptions, options) => {
    return Object.assign(mergedOptions, options);
  }, {});
}

function formatOptions(
  defaultOptions: FormatOptions & ParseOptions,
  passOptions?: FormatOptions & ParseOptions,
) {
  return {
    ...defaultFormatOptions,
    ...defaultParseOptions,
    ...defaultOptions,
    ...passOptions,
  };
}
