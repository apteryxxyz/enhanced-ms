---
"enhanced-ms": major
---

Codebase rewrite to improve readability and performance

- Added new `createMs` function to create a new instance of `ms` with custom language and formatting options

  - With this change, the `ms` function no longer accepts a language via its parameters, use `createMs` instead

- Improved performance of formatting milliseconds by up to 10%
- Added additional options to `FormatOptions` for more customisation

  - Replaced `shortFormat` with `abbreviateUnits`
  - Added `insertAnd`, outputs no longer include and by default
  - Replaced `roundUp` with `unitCount` and `roundingStrategy`
  - Added `firstUnitOnly` as a shortcut for `unitCount: 1`

- Improved base performance of parsing durations by up to 1,100%
- Removed ability for parse to handle maths operators, this will likely be re-added in a future version as an option
