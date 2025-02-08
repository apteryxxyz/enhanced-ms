import { type Language, getLanguage } from '~/languages/helpers/make-language';
import { formatUnit } from './helpers/format-unit';
import { parseMilliseconds } from './helpers/parse-milliseconds';
import {
  type FormatOptions,
  type FormatOptionsPreset,
  resolveFormatOptions,
  resolveFormatPresetOptions,
} from './helpers/resolve-options';

/**
 * Formats a duration given in milliseconds into a human-readable string.
 *
 * @param milliseconds The duration in milliseconds to format
 * @param language The language settings to use for formatting
 * @param options Optional settings or preset to customise the output format
 * @returns A formatted duration string (e.g., "1 hour, 30 minutes") or `null` if the duration is invalid
 *
 * @example
 * formatMilliseconds(90061000)
 * // Returns: "1 day 1 hour 1 minute"
 * formatMilliseconds(90061000, getLanguage('ru'), { useAbbreviations: 'short' })
 * // Returns: "1д 1ч 1м"
 */
export function formatMilliseconds(
  milliseconds: number,
  language: Language = getLanguage('en'),
  options: FormatOptions | FormatOptionsPreset = {},
) {
  const presetOptions = resolveFormatPresetOptions(options);
  const resolvedOptions = resolveFormatOptions(presetOptions);

  // ===== Parsing ===== //

  const { includedUnits } = resolvedOptions;

  const time = parseMilliseconds(milliseconds, includedUnits);
  const entries = [];
  for (const key in time) {
    const unit = key as keyof typeof time;
    const value = time[unit];
    entries.push({ unit: language.timeUnits[unit], amount: value });
  }

  // ===== Filtering ===== //

  const { includeZero } = resolvedOptions;

  const filtered = entries.filter((entry) => {
    if (entry.amount === null) return false;
    if (entry.amount === 0) return includeZero;
    return true;
  });

  // ===== Formatting ==== //

  const { unitLimit } = resolvedOptions;

  const formatted = [];
  for (let i = 0; i < filtered.length; i++) {
    const entry = filtered.at(i)!;
    if (unitLimit !== -1 && formatted.length >= unitLimit) break;
    const format = formatUnit(entry.unit, entry.amount!, resolvedOptions);
    formatted.push(format);
  }

  // ===== Joining ===== //

  const { unitSeparator, __transformDuration__ } = resolvedOptions;
  const duration = formatted.join(unitSeparator) || null;
  return duration && __transformDuration__
    ? __transformDuration__(duration)
    : duration;
}
