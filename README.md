# Enhanced MS

[![Version][version-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![JavaScript][javascript-image]][github-url]
[![License][license-image]][license-url]

Enhanced MS is a simple, zero dependencies, module that lets you easily convert milliseconds to a readable format and vice versa.

## Table Of Contents

- [**Installation**](#installation)
- [**Features**](#features)
- [**Comparison**](#comparison)
- [**Examples**](#examples)
    - [**Convert To Milliseconds**](#convert-to-milliseconds)
    - [**Convert From Milliseconds**](#convert-from-milliseconds)
- [**Usable Units**](#usage-units)

## Installation

```sh-session
npm install enhanced-ms
yarn add enhanced-ms
pnpm install enhanced-ms
```

```html
<script src="https://unpkg.com/enhanced-ms/dist/ms.min.js"></script>
```

## Features

- Works in both Node.js and the browser
- If a number is supplied, ar readable string is returned
- If a valid string is provided, the number of equivalent milliseconds is returned
- Supports 13 different time units

## Comparison

```js
const oms = require('ms');
const pms = require('pretty-ms');
const ems = require('enhanced-ms');

// Convert a single written time frame to milliseconds
oms('1m') // => 60000
pms('1m') // => TypeError: Expected a finite number
ems('1m') // => 60000

// Convert multiple written time frame measurements to milliseconds
oms('1m 30s') // => undefined
pms('1m 30s') // => TypeError: Expected a finite number
ems('1m 30s') // => 90000

// Convert milliseconds to time frame
oms(3456787654) // => '40d'
pms(3456787654) // => '40d 13m 7.6s'
ems(3456787654) // => '40d 13m 7s'

// Convert milliseconds to time frame with long option
oms(198349884, { long: true }) // => '2 days'
pms(198349884, { verbose: true }) // => '2 days 7 hours 5 minutes 49.8 seconds'
ems(198349884, { verbose: true }) // => '2 days 7 hours 5 minutes 49 seconds'
```

## Examples

```js
const ms = require('enhanced-ms');
// OR
import ms from 'enhanced-ms';
```

### Convert To Milliseconds

```js
ms('2 hours')       // 7200000
ms('1h')            // 3600000
ms('1.5 days')      // 129600000
ms('1d 12h')        // 129600000
ms('1h'.repeat(50)) // 180000000
ms('1 week')        // 604800000
ms('1y 32w')        // 50889600000
ms('-3 days')       // 259200000
ms('1y -1y')        // 0
```

### Convert From Milliseconds

```js
ms(1000)                                            // '1s'
ms(90000)                                           // '1m 30s'
ms(-420000)                                         // '-7m'
ms(123456, { verbose: true })                       // '2 minutes 3 seconds'
ms(987654, { includeMs: true })                     // '16m 27s 654ms'
ms(123.456789, { includeSubMs: true })              // '123ms 456us 789ns'
ms(0.123456, { useMu: true, includeSubMs: true })   // '123μs 456ns'
ms(ms('3d 12h'), { includeAnd: true })              // '3d and 12h'
```

## Usable Units

| Verbose     | Short |
|-------------|-------|
| nanosecond  | ns    |
| microsecond | us    |
| millisecond | ms    |
| second      | s     |
| minute      | m     |
| hour        | h     |
| day         | d     |
| week        | w     |
| month       | mn    |
| year        | y     |
| decade      | d     |
| century     | c     |
| millennium  | kyr   |

[version-image]: https://img.shields.io/github/package-json/v/apteryxxyz/enhanced-ms?logo=npm
[downloads-image]: https://img.shields.io/npm/dt/enhanced-ms?logo=npm
[javascript-image]: https://img.shields.io/github/languages/top/apteryxxyz/enhanced-ms?logo=github
[license-image]: https://img.shields.io/npm/l/enhanced-ms?logo=github

[npm-url]: https://npmjs.com/package/enhanced-ms
[license-url]: https://github.com/apteryxxyz/enhanced-ms/blob/master/LICENSE
[github-url]: https://github.com/apteryxxyz/enhanced-ms/
