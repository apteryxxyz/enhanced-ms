# enhanced-ms

## 4.1.0

### Minor Changes

- 37840a3: Added language support for Dutch, French, Italian and Spanish

### Patch Changes

- 10d9b89: Fixed handling of `includeMs` and `includeSubMs` options

## 4.0.0

### Major Changes

- 8d46d9d: Codebase rewrite to improve readability and performance

  - Added new `createMs` function to create a new instance of `ms` with custom language and formatting options

    - With this change, the `ms` function no longer accepts a language via its parameters, use `createMs` instead

  - Improved performance of formatting milliseconds by up to 10%
  - Added additional options to `FormatOptions` for more customisation

    - Replaced `shortFormat` with `useAbbreviations`
    - Added `hideUnitNames`, `includeZero`, `includedUnits`, `unitLimit`, `unitSeparator`, `minimumDigits`
    - Added format option presets: `short`, `fullPrecision`, `colonNotation`

  - Improved base performance of parsing durations by up to 1,100%
  - Removed ability for parse to handle maths operators, this will likely be re-added in a future version as an option
