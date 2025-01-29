import type { Language } from '~/languages/helpers/make-language';

export interface FormatOptions {
  /**
   * Include milliseconds in the output.
   *
   * @default false
   */
  includeMs?: boolean;

  /**
   * Include sub-milliseconds units in the output.
   *
   * @default false
   */
  includeSubMs?: boolean;

  /**
   * Specifies the format style of the output.
   *
   * - `'short'`: Uses abbreviated units (e.g. `1d` for one day).
   * - `'long'`: Uses full units (e.g. `1 day`).
   *
   * @default 'long'
   */
  formatStyle?: 'short' | 'long';

  /**
   * Include the "and" value between the units.
   *
   * @default false
   */
  insertAnd?: boolean;

  /**
   * Include commas between the units.
   *
   * @default false
   */
  insertCommas?: boolean;

  /**
   * If `true`, only the highest unit will appear in the output.
   *
   * - For example, "1d 12h" becomes "1d".
   * - Setting `unitCount` to `1` achieves the same result.
   *
   * @default false
   */
  firstUnitOnly?: boolean;

  /**
   * The number of units to include in the output.
   *
   * - Set to `-1` to include all possible units.
   * - If `firstUnitOnly` is `true`, this will default to `1`.
   *
   * @default -1
   */
  unitCount?: number;

  /**
   * The rounding strategy to use when cutting off units.
   *
   * - `'floor'`: Always rounds down.
   * - `'ceil'`: Always rounds up.
   * - `'nearest'`: Rounds to the nearest value.
   *
   * @default 'floor'
   */
  roundingStrategy?: 'floor' | 'ceil' | 'nearest';
}

/**
 * Resolves and normalises formatting options for a duration.
 *
 * @param options The user-provided options to resolve
 * @param language The language settings to apply for formatting
 * @returns The fully resolved formatting options, with defaults applied where necessary
 */
export function resolveOptions(options: FormatOptions, language: Language) {
  let {
    includeMs,
    includeSubMs,
    formatStyle,
    insertAnd,
    insertCommas,
    firstUnitOnly,
    unitCount,
    roundingStrategy,
  } = options;

  if (includeMs !== undefined && typeof includeMs !== 'boolean')
    throw new Error('Invalid includeMs option');
  if (includeSubMs !== undefined && typeof includeSubMs !== 'boolean')
    throw new Error('Invalid includeSubMs option');
  if (
    formatStyle !== undefined &&
    formatStyle !== 'short' &&
    formatStyle !== 'long'
  )
    throw new Error('Invalid formatStyle option');
  if (insertAnd !== undefined && typeof insertAnd !== 'boolean')
    throw new Error('Invalid insertAnd option');
  if (insertCommas !== undefined && typeof insertCommas !== 'boolean')
    throw new Error('Invalid insertCommas option');
  if (firstUnitOnly !== undefined && typeof firstUnitOnly !== 'boolean')
    throw new Error('Invalid firstUnitOnly option');
  if (unitCount !== undefined && typeof unitCount !== 'number')
    throw new Error('Invalid unitCount option');
  if (
    roundingStrategy !== undefined &&
    roundingStrategy !== 'floor' &&
    roundingStrategy !== 'ceil' &&
    roundingStrategy !== 'nearest'
  )
    throw new Error('Invalid roundingStrategy option');

  // Validate language support
  if (formatStyle === 'short' && !language.supportsAbbreviations)
    throw new Error('Language does not support short format');
  if (insertAnd && !language.andValue)
    throw new Error('Language does not support "and" value');

  // Resolve conflicting options
  if (includeSubMs) {
    if (includeMs === false)
      throw new Error(
        'Conflicting options: `includeSubMs` is true while `includeMs` is false.',
      );
    includeMs = true;
  }
  if (firstUnitOnly) {
    if (unitCount !== undefined && unitCount !== 1)
      throw new Error(
        'Conflicting options: `firstUnitOnly` is true while `unitCount` is defined.',
      );
    unitCount = 1;
  }

  return {
    includeMs: includeMs ?? false,
    includeSubMs: includeSubMs ?? false,
    formatStyle: formatStyle ?? 'long',
    insertAnd: insertAnd ?? false,
    insertCommas: insertCommas ?? false,
    firstUnitOnly: firstUnitOnly ?? false,
    unitCount: unitCount ?? -1,
    roundingStrategy: roundingStrategy ?? 'floor',
  };
}
