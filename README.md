# Enhanced MS

[![Version][version-image]][github-url][![Downloads][downloads-image]][npm-url][![JavaScript][javascript-image]][github-url][![License][license-image]][license-url]

## Table Of Contents

- [**About**](#about)
- [**MS vs Pretty MS vs Enhanced MS**](#MS-vs-Pretty-MS-vs-Enhanced-MS)
- [**Installation**](#installation)
- [**Examples**](#examples)

## About

A big problem I have with the `ms` module is that it rounds to the highst time measurement, so 3 hours and 45 minutes (in milliseconds) will round to 4 hours. `pretty-ms` fixes this, but that also has a big problem, it doesn't have the ability to convert written time frames to milliseconds. Problems from both begin to build up and because of these, I decided to make my own module, and publish it as `enhanced-ms`. Below is examples on how `enhanced-ms` compares to `ms` and `pretty-ms`.

## MS vs Pretty MS vs Enhanced MS

```js
const oms = require('ms'); // original ms
const pms = require('pretty-ms'); 
const ems = require('enhanced-ms');

// convert single written time frame to milliseconds
oms('1m') // => 60000
pms('1m') // => TypeError: Expected a finite number
ems('1m') // => 60000

// convert multiple written time frame measurements to milliseconds
oms('1m 30s') // => undefined
pms('1m 30s') // => TypeError: Expected a finite number
ems('1m 30s') // => 90000

// convert milliseconds to time frame
oms(3456787654) // => '40d'
pms(3456787654) // => '40d 13m 7.6s'
ems(3456787654) // => '40d 13m 7s 654ms'

// convert milliseconds to time frame with long option
oms(198349884, { long: true }) // => '2 days'
pms(198349884, { verbose: true }) // => '2 days 7 hours 5 minutes 49.8 seconds'
ems(198349884, { long: true }) // => '2 days 7 hours 5 minutes 49 seconds 884 milliseconds'
```

## Installation

Stable:
```npm install enhanced-ms```

Latest:
```npm install apteryxxyz/enhanced-ms```

## Examples

```js
const ms = require('enhanced-ms');
```

### Milliseconds to Written

```js
ms(1000) // => '1s'
ms(90000) // => '1m 30s'
ms(123456789 * 7) // => '10d 3m 17s 523ms'
ms(-123456789) // => '-1d -10h -17m -36s -789ms'
ms(ms('3 hours 30m 15 seconds')) // => '3h 30m 15s'
ms(ms('3 hours 45 minutes'), { and: true, long: true }) // => '3 hours and 45 minutes'
```

### Written to Milliseconds

```js
ms('1 minute') // => 62000
ms('1h 15m') // => 4500000
ms(('1h').repeat(50)) // => 180000000
ms(ms(7868783458)) // => 7868783458
ms('1 millennium 1 centery 1 decade 1 year 1 month 1 week 1 day 1 hour 1 minute 1 second 1 millisecond') // => 35039782861001
```

### Extra Functions
```js
ms.parse(76746)
// => {
//  years: 0,
//  days: 0,
//  hours: 0,
//  minutes: 1,
//  seconds: 16,
//  milliseconds: 746
//}

ms.pluralize('year', 1) // => 'year'
ms.pluralize('minute', 3) // => 'minutes'

ms.measurements
// => [
//  { long: 'millisecond', plural: 'milliseconds', short: 'ms', ms: 1 },
//  { long: 'second', plural: 'seconds', short: 's', ms: 1000 },
//  ...
//]
```

[version-image]: https://img.shields.io/github/package-json/v/apteryxxyz/enhanced-ms?logo=github
[downloads-image]: https://img.shields.io/npm/dt/enhanced-ms?logo=npm
[javascript-image]: https://img.shields.io/github/languages/top/apteryxxyz/enhanced-ms?logo=github
[license-image]: https://img.shields.io/npm/l/enhanced-ms?logo=github

[npm-url]: https://npmjs.com/package/enhanced-ms
[license-url]: https://github.com/apteryxxyz/enhanced-ms/blob/master/LICENSE
[github-url]: https://github.com/apteryxxyz/enhanced-ms/
