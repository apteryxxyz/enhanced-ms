import { units } from '~/time';

/**
 * Converts milliseconds into an object containing time units.
 *
 * @param milliseconds The duration in milliseconds to be parsed
 * @returns An object containing the parsed time units
 *
 * @example
 * parseMilliseconds(90061000)
 * // Returns: { ... day: 1, hour: 1, minute: 1, ... }
 */
export function parseMilliseconds(milliseconds: number) {
  return {
    year: Math.trunc(milliseconds / units.year),
    day: Math.trunc(milliseconds / units.day) % 365,
    hour: Math.trunc(milliseconds / units.hour) % 24,
    minute: Math.trunc(milliseconds / units.minute) % 60,
    second: Math.trunc(milliseconds / units.second) % 60,
    millisecond: milliseconds % 1000,
    microsecond: Math.trunc(milliseconds / units.microsecond) % 1000,
    nanosecond: Math.trunc(milliseconds / units.nanosecond) % 1000,
  } as const;
}
