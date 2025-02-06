import { units } from '~/time';
import { languages } from '..';
import type {
  LanguageDefinition,
  LanguageUnitDefinition,
} from './definition-types';

export type Language = ReturnType<typeof makeLanguage>;

/**
 * Creates a language object from a given language definition.
 *
 * @param languageDefinition - The language definition containing formatting rules and unit mappings
 * @returns A language object with parsing and formatting utilities
 *
 * @example
 * const english = makeLanguage(languages.en);
 * english.decimalSeparator // '.'
 */
export function makeLanguage(languageDefinition: LanguageDefinition) {
  const decimalSeparator = languageDefinition.decimal;
  const thousandSeparator = decimalSeparator === '.' ? ',' : '.';

  const matcherRegex = new RegExp(
    // biome-ignore lint/style/useTemplate: Better readability
    `(?![${decimalSeparator}${thousandSeparator}])` + // Don't match single .,
      `[\\d${decimalSeparator}${thousandSeparator}]+|` + // Numbers
      '(?<=\\s|\\d)((?:-)?(' + // Units
      Object.values(languageDefinition.units)
        .flatMap(({ matches }) => matches)
        .sort((a, b) => b.length - a.length)
        .join('|') +
      '))',
    'gi',
  );

  const timeUnits = Object.fromEntries(
    Object.entries(languageDefinition.units).flatMap(([unit, definition]) =>
      [unit, ...definition.matches].map((m) => [
        m,
        { ...definition, ms: units[unit as keyof typeof units] },
      ]),
    ),
  ) as unknown as Record<
    keyof typeof units | (string & {}),
    LanguageUnitDefinition & { ms: number }
  >;

  return {
    andValue: languageDefinition.and,
    decimalSeparator,
    thousandSeparator,
    matcherRegex,
    timeUnits,
    supportsAbbreviations: Object.values(timeUnits) //
      .every((u) => u.abbreviation),
  };
}

const languageCache = new Map<string, Language>();

/**
 * Make or retrieve a language object from a given locale or language definition.
 *
 * @param localeOrLanguageDefinition Either a locale string or a language definition object
 * @returns A language object with parsing and formatting utilities
 */
export function getLanguage(
  localeOrLanguageDefinition: keyof typeof languages | LanguageDefinition,
) {
  const languageDefinition =
    typeof localeOrLanguageDefinition === 'string'
      ? languages[localeOrLanguageDefinition]
      : localeOrLanguageDefinition;
  if (!languageDefinition) throw new Error('Invalid language');

  const key = JSON.stringify(languageDefinition);
  if (languageCache.has(key)) return languageCache.get(key)!;
  const language = makeLanguage(languageDefinition);
  languageCache.set(key, language);
  return language;
}
