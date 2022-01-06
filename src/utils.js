const MEASUREMENTS = {
    microsecond: {
        long: 'microsecond',
        plural: 'microseconds',
        short: 'us',
        ms: 0.001,
    },
    nanosecond: {
        long: 'nanosecond',
        plural: 'nanoseconds',
        short: 'ns',
        ms: 0.000001,
    },
    millisecond: {
        long: 'millisecond',
        plural: 'milliseconds',
        short: 'ms',
        ms: 1,
    },
    second: { long: 'second', plural: 'seconds', short: 's', ms: 1000 },
    minute: { long: 'minute', plural: 'minutes', short: 'm', ms: 60000 },
    hour: { long: 'hour', plural: 'hours', short: 'h', ms: 3600000 },
    day: { long: 'day', plural: 'days', short: 'd', ms: 86400000 },
    year: { long: 'year', plural: 'years', short: 'y', ms: 31536000000 },
    millennium: {
        long: 'millennium',
        plural: 'millenniums',
        short: 'kyr',
        ms: 31536000000000,
    },
    century: {
        long: 'century',
        plural: 'centuries',
        short: 'c',
        ms: 3153600000000,
    },
    decade: {
        long: 'decade',
        plural: 'decades',
        short: 'dec',
        ms: 315360000000,
    },
    week: { long: 'week', plural: 'weeks', short: 'w', ms: 604800000 },
    month: { long: 'month', plural: 'month', short: 'mo', ms: 2592000000 },
};

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);
const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
const isString = str => typeof str === 'string' || str instanceof String;

function modulo(divident, divisor, emitWarning) {
    if (typeof BigInt === 'undefined') {
        if (divident > Number.MAX_SAFE_INTEGER && emitWarning === true) {
            console.warn(
                [
                    `${divident} is above JavaScripts MAX_SAFE_INTEGER and `,
                    'BigInt is unavailable, enhanced-ms may return an inaccurate result',
                ].join(''),
            );
        }
        return divident % divisor;
    }
    return Number(BigInt(divident) % BigInt(divisor));
}

function parse(number, includeMs, includeSubMs) {
    if (!isNumber(number)) throw new TypeError(`Expected a number, received a ${typeof number}`);

    const round = number > 0 ? Math.floor : Math.ceil;
    let parsed = {
        years: round(number / MEASUREMENTS.year.ms),
        days: modulo(round(number / MEASUREMENTS.day.ms), 365, true),
        hours: modulo(round(number / MEASUREMENTS.hour.ms), 24, true),
        minutes: modulo(round(number / MEASUREMENTS.minute.ms), 60, true),
        seconds: modulo(round(number / MEASUREMENTS.second.ms), 60, true),
    };

    if (includeMs === true) parsed.milliseconds = modulo(round(number), 1000, true);
    if (includeSubMs === true) {
        parsed = Object.assign(parsed, {
            microseconds: modulo(round(number / MEASUREMENTS.microsecond.ms), 1000, true),
            nanoseconds: modulo(round(number / MEASUREMENTS.nanosecond.ms), 1000, true),
        });
    }

    return parsed;
}

function pluralize(word, amount) {
    let unit =
        word === '\u03BCs'
            ? MEASUREMENTS.microsecond
            : Object.values(MEASUREMENTS).find(u => u.long === word || u.short === word || u.plural === word);

    if (unit && word && word.length <= 2) return unit.short;
    else if (unit && amount > 1) return unit.plural;
    else if (unit && amount === 1) return unit.long;
    return `${word}s`;
}

function formatOptions(options, defaultOptions) {
    // Valid options:
    // 1. includeMs: include milliseconds in the output
    // 2. includeSubMs: include sub-milliseconds in the output
    // 3. includeAnd: include 'and' in the output
    // 4. useMu: use the symbol for microseconds in the output
    // 5. verbose: use the long name of measurements
    // 6. compact: only return the largest unit

    if (defaultOptions) {
        defaultOptions = Object.assign(Object.create(defaultOptions), defaultOptions);
    } else {
        defaultOptions = {
            includeMs: false,
            includeSubMs: false,
            includeAnd: false,
            useMu: false,
            verbose: false,
            compact: false,
        };
    }

    if (options) {
        // The following are valid options in previous versions of this library
        if (options.ms) defaultOptions.includeMs = options.ms;
        if (options.and) defaultOptions.includeAnd = options.and;
        if (options.long) defaultOptions.verbose = options.long;
        if (options.raw) defaultOptions.returnParsed = options.raw;
        defaultOptions = Object.assign(defaultOptions, options);
    }

    if (defaultOptions.includeSubMs) defaultOptions.includeMs = true;
    return defaultOptions;
}

module.exports = {
    units: Object.values(MEASUREMENTS),
    parse,
    pluralize,
    formatOptions,
    isNumber,
    isObject,
    isString,
    modulo,
};
