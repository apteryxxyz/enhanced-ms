import type { Language } from '../languages';

export default {
    decimal: '.',
    thousands: [' ', ','],
    and: 'and',

    units: [
        {
            key: 'ns',
            long: c => (c === 1 ? 'nanosecond' : 'nanoseconds'),
            short: 'ns',
            matches: ['ns', 'nanosecond', 'nanoseconds'],
        },
        {
            key: 'us',
            long: c => (c === 1 ? 'microsecond' : 'microseconds'),
            short: 'us',
            matches: ['us', 'microsecond', 'microseconds'],
        },
        {
            key: 'ms',
            long: c => (c === 1 ? 'millisecond' : 'milliseconds'),
            short: 'ms',
            matches: ['ms', 'millisecond', 'microseconds'],
        },
        {
            key: 's',
            long: c => (c === 1 ? 'second' : 'seconds'),
            short: 's',
            matches: ['s', 'second', 'seconds', 'sec', 'secs'],
        },
        {
            key: 'm',
            long: c => (c === 1 ? 'minute' : 'minutes'),
            short: 'm',
            matches: ['m', 'minute', 'minutes', 'min', 'mins'],
        },
        {
            key: 'h',
            long: c => (c === 1 ? 'hour' : 'hours'),
            short: 'h',
            matches: ['h', 'hour', 'hours', 'hr', 'hrs'],
        },
        {
            key: 'd',
            long: c => (c === 1 ? 'day' : 'days'),
            short: 'd',
            matches: ['d', 'day', 'days'],
        },
        {
            key: 'w',
            long: c => (c === 1 ? 'week' : 'weeks'),
            short: 'w',
            matches: ['w', 'week', 'weeks', 'wk', 'wks'],
        },
        {
            key: 'mo',
            long: c => (c === 1 ? 'month' : 'months'),
            short: 'mo',
            matches: ['mo', 'month', 'months', 'mth', 'mths', 'mnth', 'mnths'],
        },
        {
            key: 'y',
            long: c => (c === 1 ? 'year' : 'years'),
            short: 'y',
            matches: ['y', 'year', 'years', 'yr', 'yrs'],
        },
        {
            key: 'dec',
            long: c => (c === 1 ? 'decade' : 'decades'),
            short: 'dec',
            matches: ['dec', 'decade', 'decades'],
        },
        {
            key: 'c',
            long: c => (c === 1 ? 'century' : 'centuries'),
            short: 'c',
            matches: ['c', 'century', 'centuries', 'hundred years'],
        },
        {
            key: 'kyr',
            long: c => (c === 1 ? 'millennium' : 'millenniums'),
            short: 'kyr',
            matches: ['kyr', 'millennium', 'millenniums', 'thousand years'],
        },
    ],
} as Language;
