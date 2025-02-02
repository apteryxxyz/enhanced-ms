import type { Language } from '~/languages/helpers/make-language';

/**
 * Formats a unit and amount into a duration string.
 *
 * @param unit Language-specific time unit object
 * @param amount The numeric amount of the time unit (e.g., 2 for "2 hours")
 * @param shortFormat Whether to use the abbreviated format
 * @returns Formatted duration string
 *
 * @example
 * formatUnit(getLanguage('en').timeUnits.hour, 2, false)
 * // Returns: "2 hours"
 *
 * @example
 * formatUnit(getLanguage('en').timeUnits.hour, 2, true)
 * // Returns: "2h"
 */
export function formatUnit(
  unit: Language['timeUnits'][string],
  amount: number,
  shortFormat: boolean,
) {
  const name = pluraliseUnit(unit, Math.abs(amount), shortFormat);
  return `${amount}${shortFormat ? '' : ' '}${name}`;
}

/**
 * Returns the singular or plural form of a unit based on the amount.
 *
 * @param unit Language-specific time unit object
 * @param amount The numeric amount to determine pluralisation
 * @param shortFormat Whether to use the abbreviated format
 * @returns Pluralised unit
 *
 * @example
 * pluraliseUnit(getLanguage('en').timeUnits.hour, 1, true)
 * // Returns: "h"
 *
 * @example
 * pluraliseUnit(getLanguage('en').timeUnits.hour, 2, false)
 * // Returns: "hours"
 */
export function pluraliseUnit(
  unit: Language['timeUnits'][string],
  amount: number,
  shortFormat: boolean,
) {
  const factory =
    shortFormat && unit.abbreviation ? unit.abbreviation : unit.name;
  return typeof factory === 'function' ? factory(amount) : factory;
}
