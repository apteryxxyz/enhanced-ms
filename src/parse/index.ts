import { type Language, getLanguage } from '~/languages/helpers/make-language';
import {
  type ParseOptions,
  defaultParseOptions,
  resolveOptions,
} from './helpers/resolve-options';

/**
 * Parse a human-readable duration string into milliseconds.
 *
 * @param duration The duration string to parse (e.g., "2h 30m", "1 day, 5 hours")
 * @param language The language used for parsing, defaults to English
 * @param options Parsing options for customisation
 * @returns The total duration in milliseconds, including 0 if the duration is invalid
 *
 * @example
 * parseDuration("2h 30m")
 * // Returns: 9000000 (2 hours + 30 minutes in ms)
 *
 * @example
 * const german = getLanguage('de');
 * parseDuration("2 stunden 30 minuten", german)
 */
export function parseDuration(
  duration: string,
  language: Language = getLanguage('en'),
  options: ParseOptions = defaultParseOptions,
) {
  const resolvedOptions = resolveOptions(options, language);
  void resolvedOptions;

  const matches = duration.toLowerCase().match(language.matcherRegex);
  if (!matches || matches.length === 0) return 0;

  let total = 0;
  for (let i = 0; i < matches.length; i += 2) {
    const [amount, unit] = matches.slice(i, i + 2) as [string, string];
    const ms = language.timeUnits[unit]?.ms;
    if (ms) total += Number(amount) * ms;
  }
  return total;
}
