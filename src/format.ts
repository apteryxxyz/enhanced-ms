import { LanguageOptions, Unit, defaultLanguageOptions } from './languages';
import { measurements } from './measurements';

/** Options to pass to the format function. */
export interface FormatOptions {
  /** Include input in the output. */
  includeMs?: boolean;
  /** Include sub input in the output. */
  includeSubMs?: boolean;
  /** Insert commas in-between each unit. */
  insertCommas?: boolean;
  /** Round the result to the highest unit. */
  roundUp?: boolean;
  /** Use the short names of measurements. */
  shortFormat?: boolean;
}
export const defaultFormatOptions: FormatOptions = {
  includeMs: false,
  includeSubMs: false,
  insertCommas: false,
  shortFormat: false,
  roundUp: false,
};

/**
 * Convert milliseconds to a human readable string.
 * @param input Number of milliseconds.
 * @param options Options for formatting.
 * @param language Language options.
 * @returns Either a human readable string or null if the input is less than 1 second
 * and `includeMs` and `includeSubMs` are both false.
 */
export function format(
  input: number,
  options: FormatOptions = defaultFormatOptions,
  language: LanguageOptions = defaultLanguageOptions,
) {
  // Convert negative input to positive and store the sign
  const isNegative = input < 0;
  if (isNegative) input *= -1;
  const resultPrefix = isNegative ? '-' : '';

  // Early return if the input is less than 1 second and both includeMs and includeSubMs are false
  if (!options.includeMs && !options.includeSubMs && input < 1_000) return null;

  const parsedTime = parseTime(
    input,
    options.includeMs,
    options.includeSubMs || options.roundUp,
  );
  const timeEntries: [string, number][] = [];
  for (const key in parsedTime) {
    const value = parsedTime[key]!;
    if (value > 0) timeEntries.push([key, value]);
  }
  if (timeEntries.length === 0) return null;

  const useShort = options.shortFormat && language.supportsAbbreviations;

  if (options.roundUp) {
    const highestUnit = language.units[timeEntries[0]![0]!]!;
    let totalValue = timeEntries[0]![1]!;

    for (let i = timeEntries.length - 2; i >= 0; i--) {
      const [key, value] = timeEntries[i]!;
      if (value * language.units[key]!.ms > 0) {
        if (key === highestUnit.key) totalValue += 1;
        else timeEntries[i]![1] += 1;
      }
    }

    return addThousandsSeparators(
      resultPrefix + formatResult(totalValue, highestUnit, useShort),
      language.thousandsSeparator,
      totalValue >= 1_000,
    );
  }

  const timeStrings = timeEntries.map(([key, value]) => {
    return formatResult(value, language.units[key]!, useShort);
  });

  const totalLength = timeStrings.length;
  if (!useShort && totalLength > 1) {
    timeStrings[totalLength - 1] = /*
     */ `${language.andValue} ${timeStrings[totalLength - 1]!}`;
  }

  return addThousandsSeparators(
    resultPrefix +
      timeStrings.join(useShort || !options.insertCommas ? ' ' : ', '),
    language.thousandsSeparator,
    timeEntries.some(([_, value]) => value > 999),
  );
}

// HELPERS

/** Pluralise a unit */
function pluraliseUnit(unit: Unit, count: number, useShort: boolean) {
  const abbreviation =
    typeof unit.abbreviation === 'function'
      ? unit.abbreviation(Math.abs(count))
      : unit.abbreviation;
  const name =
    typeof unit.name === 'function' ? unit.name(Math.abs(count)) : unit.name;
  return useShort && abbreviation ? abbreviation : name;
}

/** Parse a time in milliseconds into an object of units. */
function parseTime(
  milliseconds: number,
  includeMs = false,
  includeSubMs = false,
): Record<string, number> {
  if (includeSubMs) includeMs = true;
  const round = milliseconds > 0 ? Math.floor : Math.ceil;

  return {
    y: round(milliseconds / measurements.y),
    d: round(milliseconds / measurements.d) % 365,
    h: round(milliseconds / measurements.h) % 24,
    m: round(milliseconds / measurements.m) % 60,
    s: round(milliseconds / measurements.s) % 60,

    ms: includeMs ? round(milliseconds) % 1_000 : -1,
    us: includeSubMs ? round(milliseconds / measurements.us) % 1_000 : -1,
    ns: includeSubMs ? round(milliseconds / measurements.ns) % 1_000 : -1,
  };
}

/** Format a result. */
function formatResult(amount: number, unit: Unit, useShort = false) {
  return `${amount}${useShort ? '' : ' '}${pluraliseUnit(
    unit,
    amount,
    useShort,
  )}`;
}

/** Format the result to include thousands separators. */
function addThousandsSeparators(
  value: string,
  separator: string,
  needsSeparators: boolean,
) {
  if (!needsSeparators) return value;
  // Using a regex is faster than Number#toLocaleString
  return value.replaceAll(/\B(?=(?:\d{3})+(?!\d))/g, separator);
}
