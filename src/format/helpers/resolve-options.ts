import type { ParseUnit } from './parse-milliseconds';

// ===== Options ===== //

export interface FormatOptions {
  /**
   * Extends the preset with the given options.
   */
  extends?: FormatOptionsPreset;

  /**
   * Hide unit names from the output.
   * - Used as part of the `colonNotation` preset.
   * @default false
   */
  hideUnitNames?: boolean;

  /**
   * Use abbreviations for unit names.
   * @default false
   */
  useAbbreviations?: boolean;

  /**
   * Include units with the value 0 in the output.
   * - Used as part of the `colonNotation` preset.
   * @default false
   */
  includeZero?: boolean;

  /**
   * Include milliseconds in the output.
   * - Shorthand for adding `millisecond` to the `includedUnits` option.
   * @default false
   */
  includeMs?: boolean;

  /**
   * Include sub-millisecond units in the output.
   * - Enabling this option will automatically enable the `includeMs` option.
   * - Shorthand for adding `microsecond` and `nanosecond` to the `includedUnits` option.
   * @default false
   */
  includeSubMs?: boolean;

  /**
   * Which units should be included in the output.
   * @default ['year', 'day', 'hour', 'minute', 'second']
   */
  includedUnits?: ParseUnit[];

  /**
   * The maximum number of units to include in the output.
   * - If the value is -1, all units will be included.
   * @default -1
   */
  unitLimit?: number;

  /**
   * The separator to use between units.
   * @default ' '
   */
  unitSeparator?: string;

  /**
   * The minimum number of digits for a unit, aka will pad with zeroes.
   * - Used as part of the `colonNotation` preset.
   * @default 0
   */
  minimumDigits?: number;

  /**
   * @internal
   */
  __transformDuration__?: (duration: string) => string;
}

export const defaultFormatOptions = {
  hideUnitNames: false,
  useAbbreviations: false,
  includeZero: false,
  includeMs: false,
  includeSubMs: false,
  includedUnits: ['year', 'day', 'hour', 'minute', 'second'],
  unitLimit: -1,
  unitSeparator: ' ',
  minimumDigits: 0,
} satisfies Required<Omit<FormatOptions, 'extends' | `__${string}__`>>;

export function resolveFormatOptions(options: Omit<FormatOptions, 'extends'>) {
  let {
    hideUnitNames = defaultFormatOptions.hideUnitNames,
    useAbbreviations = defaultFormatOptions.useAbbreviations,
    includeZero = defaultFormatOptions.includeZero,
    includeMs = defaultFormatOptions.includeMs,
    includeSubMs = defaultFormatOptions.includeSubMs,
    includedUnits = [...defaultFormatOptions.includedUnits],
    unitLimit = defaultFormatOptions.unitLimit,
    unitSeparator = defaultFormatOptions.unitSeparator,
    minimumDigits = defaultFormatOptions.minimumDigits,
  } = options;

  if (typeof includeMs !== 'boolean')
    throw new Error('Invalid includeMs option');
  if (typeof includeSubMs !== 'boolean')
    throw new Error('Invalid includeSubMs option');

  if (typeof hideUnitNames !== 'boolean')
    throw new Error('Invalid hideUnitNames option');
  if (typeof useAbbreviations !== 'boolean')
    throw new Error('Invalid useAbbreviations option');
  if (typeof includeZero !== 'boolean')
    throw new Error('Invalid includeZero option');
  if (!Array.isArray(includedUnits))
    throw new Error('Invalid includedUnits option');
  if (typeof unitLimit !== 'number')
    throw new Error('Invalid unitLimit option');
  if (typeof unitSeparator !== 'string')
    throw new Error('Invalid unitSeparator option');
  if (typeof minimumDigits !== 'number')
    throw new Error('Invalid minimumDigits option');

  // Resolve conflicting options
  if (includeSubMs) {
    if (includeMs === false)
      throw new Error(
        'Conflicting options: `includeSubMs` is true while `includeMs` is false.',
      );
    includeMs = true;
  }

  // Resolve short-hand options
  if (includeMs) includedUnits.push('millisecond');
  if (includeSubMs) includedUnits.push('microsecond', 'nanosecond');

  return {
    hideUnitNames,
    useAbbreviations,
    includeZero,
    includedUnits,
    unitLimit,
    unitSeparator,
    minimumDigits,

    __transformDuration__: options.__transformDuration__,
  };
}

export type ResolvedFormatOptions = ReturnType<typeof resolveFormatOptions>;

// ===== Presets ===== //

/**
 * - `'short'`: e.g. `1m 30s`
 * - `'fullPrecision'`: e.g. `10 seconds 100 milliseconds 100 microseconds 100 nanoseconds`
 * - `'colonNotation'`: e.g. `00:01:30`
 */
export type FormatOptionsPreset = keyof typeof formatOptionsPresets;

export const formatOptionsPresets = {
  short: {
    useAbbreviations: true,
    unitLimit: 2,
  },
  fullPrecision: {
    includeMs: true,
    includeSubMs: true,
  },
  colonNotation: {
    hideUnitNames: true,
    unitLimit: 3,
    includeZero: true,
    includedUnits: ['hour', 'minute', 'second'],
    unitSeparator: ':',
    minimumDigits: 2,
    // I couldn't think of an option that would be better than this
    __transformDuration__: (duration) => duration.replace(/^00:/, ''),
  },
} satisfies Record<string, Omit<FormatOptions, 'preset'>>;

export function resolveFormatPresetOptions(
  options: FormatOptions | FormatOptionsPreset = {},
) {
  if (typeof options === 'string') options = { extends: options };
  return {
    ...(options.extends && formatOptionsPresets[options.extends]),
    ...options,
    preset: undefined,
  };
}
