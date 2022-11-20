<div align="center">
    <i>Convert human readable time-frame strings to milliseconds and back to strings</i><br>
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

`enhanced-ms` is a simple, zero dependencies, module that lets you easily convert milliseconds to a readable format and vice versa. It is an enhanced version of the original `ms` module, with support for mutliple time-frames, localisation and operators!

## Features

- Localisation support!
- Convert from milliseconds to time-frame
- Convert from time-frame to milliseconds
- Operator in time-frame support
- Customisable outputs

# 🏓 Table of Contents

- [🤔 About](#-about)
  - [Features](#features)
- [🏓 Table of Contents](#-table-of-contents)
- [📩 Installation](#-installation)
- [🧭 Comparison](#-comparison)
- [🌐 Languages](#-languages)
- [🍕 API](#-api)
  - [Conversion](#conversion)
  - [Globals](#globals)
- [🌀 Examples](#-examples)
  - [Time-frame to Milliseconds](#time-frame-to-milliseconds)
  - [Milliseconds to Time-frame](#milliseconds-to-time-frame)
  - [Set Global Options](#set-global-options)
  - [Set Global Language](#set-global-language)

# 📩 Installation

```bash
npm install enhanced-ms
yarn add enhanced-ms
pnpm add enhanced-ms
```

```js
const ms = require('enhanced-ms');
// OR
import ms from 'enhanced-ms';
```

# 🧭 Comparison

As mentioned previously, `enhanced-ms` is inspired by the original `ms` module, so how does it compare to it?

`pretty-ms` is another conversion module.

```ts
import oms from 'ms';
import pms from 'pretty-ms';
import ems from 'enhanced-ms';

// Convert a single written time-frame to milliseconds
oms('1m'); // -> 60000
pms('1m'); // -> TypeError: Expected a finite number
ems('1m'); // -> 60000

// Convert multiple written time-frame measurements to milliseconds
oms('1m 30s'); // -> undefined
pms('1m 30s'); // -> TypeError: Expected a finite number
ems('1m 30s'); // -> 90000

// Convert milliseconds to time-frame with long option
oms(198349884, { long: true }); // -> '2 days'
pms(198349884, { verbose: true }); // -> '2 days 7 hours 5 minutes 49.8 seconds'
ems(198349884); // -> '2 days 7 hours 5 minutes and 49 seconds'

// Convert milliseconds to time-frame
oms(3456787654); // -> '40d'
pms(3456787654); // -> '40d 13m 7.6s'
ems(3456787654, { shortFormat: true }); // -> '40d 13m 7s'
```

# 🌐 Languages

The currently supported languages include:

| Language | Key |
| :------: | :-: |
| English  | en  |
|  German  | de  |
|  Māori   | mi  |

You can help by adding support for more languages.

Make a pull request [here](https://github.com/apteryxxyz/enhanced-ms/tree/main/src/locales).

# 🍕 API

## Conversion

When the first parameter is a string, the module will parse it and convert it into a time-frame in milliseconds.

If no time units were found within the string, `null` will be returned.

```ts
function ms(value1: string, value2?: LanguageKey | Options, value3?: Options): number | null;
```

However when the first parameter is a number it will be converted into a time-frame string.

If no time units were outputted (for example then the inputted number is less than `1000` and `includeMs` is `false`), `null` will be returned.

```ts
function ms(value1: number, value2?: LanguageKey | Options, value3?: Options): string | null;
```

For both of the above overloads, the second parameter can either be the language key, or the options object. The third and final parameter is only ever used if a language key is supplied.

## Globals

If you prefer that the results always include in a different language, or if you want milliseconds to always be included, this is for you.

The following will overwrite the modules defaults, you can find some examples further down.

```ts
function ms(value1: LanguageKey): typeof ms;
```

```ts
function ms(value1: Options): typeof ms;
```

Both of these will return the `ms` function, which will allow you to do:

```js
const ms = require('enhanced-ms')('en')({ roundUp: true });
```

**TypeScript Interfaces**

For `LanguageKey`, navigate to [🌐 Languages](#-languages).

```ts
interface Options {
    /** Include milliseconds in the output */
    includeMs?: boolean;
    /** Include micro and nano seconds in the output */
    includeSubMs?: boolean;
    /** Use the short names of measurements */
    shortFormat?: boolean;
    /** Round the result to the highest unit */
    roundUp?: boolean;
}
```

# 🌀 Examples

## Time-frame to Milliseconds

```js
ms('1 day') === 86400000;
ms('3m 34s') === 214000;
ms(ms('1d - 4h')) === '20 hours';
ms(ms('7d / 7')) === '1 day';
ms('1 meneti', 'mi') === 60000;
```

## Milliseconds to Time-frame

```js
ms(123456) === '2 minutes and 3 seconds';

ms(123456, { shortFormat: true }) === '2m 3s';
ms(123456, { roundUp: true }) === '2 minutes';
ms(123456, { includeMs: true }) === '2 minutes 3 seconds and 456 milliseconds';
ms(123.456, { includeSubMs: true }) === '123 milliseconds and 456 microseconds';

ms(123456, 'mi') === '2 meneti me te 3 hēkona';
ms(123456, 'mi', { roundUp: true }) === '2 meneti';
ms(123.456, 'mi', { includeSubMs: true }) === '123 manomano hēkona me te 456 moroiti hēkona';
```

## Set Global Options

```js
ms(1234567) === '20 minutes and 34 seconds';
ms({ roundUp: true }) instanceof Function;
ms(1234567) === '21 minutes';
```

## Set Global Language

```js
ms(1000) === '1 second';
ms('mi') instanceof Function;
ms(1000) === '1 hēkona';
```
