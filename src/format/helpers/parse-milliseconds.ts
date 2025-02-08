import { units } from '~/time';

export const parseUnits = {
  year: units.year,
  day: units.day,
  hour: units.hour,
  minute: units.minute,
  second: units.second,
  millisecond: units.millisecond,
  microsecond: units.microsecond,
  nanosecond: units.nanosecond,
};
export type ParseUnit = keyof typeof parseUnits;

/**
 * Converts milliseconds into an object containing time units.
 *
 * @param milliseconds The duration in milliseconds to be parsed
 * @param includedUnits The units to include in the parsed object
 * @returns An object containing the parsed time units
 *
 * @example
 * parseMilliseconds(90061000)
 * // Returns: { ... day: 1, hour: 1, minute: 1, ... }
 * parseMilliseconds(90061000, ['day', 'minute'])
 * // Returns: { ... day: 1, hour: null, minute: 61, ... }
 */
export function parseMilliseconds(
  milliseconds: number,
  includedUnits = Object.keys(parseUnits) as ParseUnit[],
) {
  let remainingMs = milliseconds;
  const parsed: Record<string, number | null> = {};

  for (const key in parseUnits) {
    const unit = key as ParseUnit;
    if (includedUnits.includes(unit)) {
      parsed[unit] = Math.trunc(remainingMs / parseUnits[unit]);
      remainingMs %= parseUnits[unit];
    } else {
      parsed[unit] = null;
    }
  }

  return parsed as Record<ParseUnit, number | null>;
}
