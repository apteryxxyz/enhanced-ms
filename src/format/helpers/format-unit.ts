import type { Language } from '~/languages/helpers/make-language';
import type { ResolvedFormatOptions } from './resolve-options';

/**
 * Formats a unit and amount into a duration string.
 *
 * @param unit Language-specific time unit object
 * @param amount The numeric amount of the time unit (e.g., 2 for "2 hours")
 * @param options Formatting options
 * @returns Formatted duration string
 *
 * @example
 * formatUnit(getLanguage('en').timeUnits.hour, 2, { useAbbreviations: false })
 * // Returns: "2 hours"
 * formatUnit(getLanguage('en').timeUnits.hour, 2, { useAbbreviations: true })
 * // Returns: "2h"
 */
export function formatUnit(
  unit: Language['timeUnits'][string],
  count: number,
  options: Pick<
    ResolvedFormatOptions,
    'useAbbreviations' | 'hideUnitNames' | 'minimumDigits'
  >,
) {
  const { useAbbreviations, hideUnitNames, minimumDigits } = options;
  const amount = count.toString().padStart(minimumDigits, '0');
  if (hideUnitNames) return amount;
  const name = pluraliseUnit(unit, count, options);
  return `${amount}${useAbbreviations ? '' : ' '}${name}`;
}

/**
 * Returns the singular or plural form of a unit based on the amount.
 *
 * @param unit Language-specific time unit object
 * @param amount The numeric amount to determine pluralisation
 * @param options Formatting options
 * @returns Pluralised unit
 *
 * @example
 * pluraliseUnit(getLanguage('en').timeUnits.hour, 1, { useAbbreviations: true })
 * // Returns: "h"
 *
 * @example
 * pluraliseUnit(getLanguage('en').timeUnits.hour, 2, { useAbbreviations: false })
 * // Returns: "hours"
 */
export function pluraliseUnit(
  unit: Language['timeUnits'][string],
  count: number,
  options: Pick<ResolvedFormatOptions, 'useAbbreviations'>,
) {
  const { useAbbreviations } = options;
  const factory =
    useAbbreviations && unit.abbreviation ? unit.abbreviation : unit.name;
  return typeof factory === 'function' ? factory(Math.abs(count)) : factory;
}
