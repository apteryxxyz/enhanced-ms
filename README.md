<div align="center">
    <i>Convert human readable timeframe strings to milliseconds and back to strings</i><br>
    <code>npm install enhanced-ms</code>
</div>

<div align="center">
    <img alt="package version" src="https://img.shields.io/npm/v/enhanced-ms?label=version">
    <img alt="total downloads" src="https://img.shields.io/npm/dt/enhanced-ms">
    <br>
    <a href="https://github.com/apteryxxyz"><img alt="apteryxxyz followers" src="https://img.shields.io/github/followers/apteryxxyz?style=social"></a>
    <a href="https://github.com/apteryxxyz/enhanced-ms"><img alt="enhanced-ms repo stars" src="https://img.shields.io/github/stars/apteryxxyz/enhanced-ms?style=social"></a>
</div>

# 🤔 About

Enhanced MS is a simple, zero dependencies, module that lets you easily convert milliseconds to a readable format and vice versa.

## Feature

- Convert from timeframe to milliseconds
- Convert from milliseconds to timeframe
- Support for operators in timeframe string
- Support for different languages

# 🏓 Table of Contents

- [🤔 About](#-about)
  - [Feature](#feature)
- [🏓 Table of Contents](#-table-of-contents)
- [📩 Installation](#-installation)
- [🧭 Comparison](#-comparison)
- [🌐 Languages](#-languages)
- [🍕 API](#-api)
- [🌀 Examples](#-examples)
  - [Timeframe to Milliseconds](#timeframe-to-milliseconds)
  - [Milliseconds to TImeframe](#milliseconds-to-timeframe)
  - [Set Global Options](#set-global-options)
  - [Set Global Language](#set-global-language)

# 📩 Installation

```bash
npm install enhanced-ms
yarn add enhanced-ms
pnpm add enhanced-ms
```

# 🧭 Comparison

```ts
import oms from 'ms';
import pms from 'pretty-ms';
import ems from 'enhanced-ms';

// Convert a single written time frame to milliseconds
oms('1m') // -> 60000
pms('1m') // -> TypeError: Expected a finite number
ems('1m') // -> 60000

// Convert multiple written time frame measurements to milliseconds
oms('1m 30s') // -> undefined
pms('1m 30s') // -> TypeError: Expected a finite number
ems('1m 30s') // -> 90000

// Convert milliseconds to time frame with long option
oms(198349884, { long: true }) // -> '2 days'
pms(198349884, { verbose: true }) // -> '2 days 7 hours 5 minutes 49.8 seconds'
ems(198349884) // -> '2 days 7 hours 5 minutes and 49 seconds'

// Convert milliseconds to time frame
oms(3456787654) // -> '40d'
pms(3456787654) // -> '40d 13m 7.6s'
ems(3456787654, { shortFormat: true }) // -> '40d 13m 7s'
```

# 🌐 Languages

| Language |  Key  |
| :------: | :---: |
| English  |  en   |
|  Māori   |  mi   |

You can help by adding support for more languages.
Make a pull request [here](https://github.com/apteryxxyz/enhanced-ms).

# 🍕 API

```js
const ms = require('enhanced-ms');
// OR
import ms from 'enhanced-ms';
```

**Main Function**

```ts
function ms(
    value1?: string | number | LanguageKey | Options,
    value2?: LanguageKey | Options,
    value3?: Options
): number | string | null | typeof ms;
```

**TypeScript Interfaces**

For `LanguageKey`, navigate to [🌐 Languages](#-languages).

```ts
interface Options {
    /** Include milliseconds in the output */
    includeMs?: boolean;
    /** Include sub milliseconds in the output */
    includeSubMs?: boolean;
    /** Use the short names of measurements */
    shortFormat?: boolean;
    /** Round the result to the highest unit */
    roundUp?: boolean;
}
```

# 🌀 Examples

## Timeframe to Milliseconds

```js
ms('1 day') === 86400000
ms('3m 34s') === 214000
ms(ms('1d - 4h')) === '20 hours'
ms(ms('7d / 7')) === '1 day'
ms('1 meneti', 'mi') === 60000
```

## Milliseconds to TImeframe

 ```js
ms(123456) === '2 minutes and 3 seconds'

ms(123456, { shortFormat: true }) === '2m 3s'
ms(123456, { roundUp: true }) === '2 minutes'
ms(123456, { includeMs: true }) === '2 minutes 3 seconds and 456 milliseconds'
ms(123.456, { includeSubMs: true }) === '123 milliseconds and 456 microseconds'

ms(123456, 'mi') === '2 meneti me te 3 hēkona'
ms(123456, 'mi', { roundUp: true }) === '2 meneti'
ms(123.456, 'mi', { includeSubMs: true }) === '123 manomano hēkona me te 456 moroiti hēkona'
```

## Set Global Options

```js
ms(1234567) === '20 minutes and 34 seconds'
ms({ roundUp: true }) instanceof Function
ms(1234567) === '21 minutes'
```

## Set Global Language

```js
ms(1000) === '1 second'
ms('mi') instanceof Function
ms(1000) === '1 hēkona'
```
