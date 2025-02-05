import { type Language, getLanguage } from '~/languages/helpers/make-language';
import { formatUnit } from './helpers/format-unit';
import { parseMilliseconds } from './helpers/parse-milliseconds';
import { type FormatOptions, resolveOptions } from './helpers/resolve-options';

/**
 * Formats a duration given in milliseconds into a human-readable string.
 *
 * @param milliseconds The duration in milliseconds to format
 * @param language The language settings to use for formatting
 * @param options Optional settings to customise the output format
 * @returns A formatted duration string (e.g., "1 hour, 30 minutes") or `null` if the duration is invalid
 *
 * @example
 * formatMilliseconds(90061000)
 * // Returns: "1 day 1 hour 1 minute"
 *
 * @example
 * formatMilliseconds(90061000, getLanguage('ru'), { formatStyle: 'short' })
 * // Returns: "1д 1ч 1м"
 */
export function formatMilliseconds(
  milliseconds: number,
  language: Language = getLanguage('en'),
  options: FormatOptions = {},
) {
  const resolvedOptions = resolveOptions(options, language);

  const time = parseMilliseconds(milliseconds);
  const entries = [];
  for (const key in time) {
    const unit = key as keyof typeof time;
    const value = time[unit];
    entries.push({ unit: language.timeUnits[unit]!, amount: value });
  }

  // ===== Rounding ===== //

  const { unitCount, roundingStrategy } = resolvedOptions;
  const showCount = unitCount === -1 ? entries.length : unitCount;

  let roundCount = entries.length - showCount;
  for (let i = 0; i < roundCount; i++) {
    const current = entries.at(-1 - i)!;
    const next = entries.at(-1 - i - 1)!;
    if (!next) break;

    const ratio = (current.amount * current.unit.ms) / next.unit.ms;

    if (
      (roundingStrategy === 'nearest' && ratio > 0.5) ||
      (roundingStrategy === 'ceil' && ratio > 0 && next.amount > 0)
      // (roundingStrategy === 'floor') do nothing
    ) {
      if (next.amount === 0) roundCount++;
      next.amount++;
      current.amount = 0;
    }
  }

  // ===== Cutting ===== //

  const { includeMs, includeSubMs } = resolvedOptions;

  if (!includeSubMs) entries.pop() && entries.pop();
  if (!includeMs) entries.pop();

  // ===== Formatting ===== //

  const { abbreviateUnits /*, showCount */ } = resolvedOptions;

  const parts: string[] = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries.at(i)!;
    if (entry.amount === 0) continue;
    if (parts.length >= showCount) break;

    const format = formatUnit(entry.unit, entry.amount, abbreviateUnits);
    parts.push(format);
  }

  // ===== Inserting ===== //

  const { insertAnd, insertCommas } = resolvedOptions;

  if (insertCommas && parts.length > 1) {
    for (let i = 0; i < parts.length - 1; i++) parts[i] += ',';
  }

  if (insertAnd && language.andValue && parts.length > 1) {
    if (typeof language.andValue === 'string') {
      parts[parts.length - 1] =
        `${language.andValue} ${parts[parts.length - 1]}`;
    } else {
      const output = language.andValue(parts);
      parts.length = output.length;
      for (let i = 0; i < parts.length; i++) parts[i] = output[i]!;
    }
  }

  return parts.join(' ') || null;
}
