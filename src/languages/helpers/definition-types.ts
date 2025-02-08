import type { units } from '~/time';

export interface LanguageDefinition {
  /**
   * The decimal separator the language uses.
   * @example '.' for English, ',' for German
   */
  decimal: '.' | ',';

  /**
   * The string or factory function to use for the "and" value.
   * @remark Omitting this will cause errors if trying to format durations with `insertAnd` set to `true`
   * @example 'and' for English, 'und' for German
   */
  and?: string | ((words: string[]) => string[]);

  /**
   * Specific time units for the language.
   */
  units: Record<keyof typeof units, LanguageUnitDefinition>;
}

export interface LanguageUnitDefinition {
  /**
   * The string or factory function to use for the unit name.
   * @example 'hour' for English, 'Stunde' for German
   */
  name: string | ((count: number) => string);

  /**
   * The string or factory function to use for the unit abbreviation.
   * @remark Omitting this will cause errors if trying to format durations with `formatStyle` set to `'short'`
   * @example 'h' for English, 'Std.' for German
   */
  abbreviation?: string | ((count: number) => string);

  /**
   * A list of strings to use for matching units in a duration string.
   * @example ['h', 'hr', 'hour', 'hours'] for English
   */
  matches: Lowercase<string>[];
}
