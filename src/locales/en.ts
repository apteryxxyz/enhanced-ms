import type { Language } from '../languages';

export default {
    decimal: '.',
    and: 'and',

    units: [
        {
            key: 'ns',
            name: c => (c === 1 ? 'nanosecond' : 'nanoseconds'),
            abbreviation: 'ns',
            matches: ['ns', 'nanosecond', 'nanoseconds'],
        },
        {
            key: 'us',
            name: c => (c === 1 ? 'microsecond' : 'microseconds'),
            abbreviation: 'us',
            matches: ['us', 'microsecond', 'microseconds'],
        },
        {
            key: 'ms',
            name: c => (c === 1 ? 'millisecond' : 'milliseconds'),
            abbreviation: 'ms',
            matches: ['ms', 'millisecond', 'microseconds'],
        },
        {
            key: 's',
            name: c => (c === 1 ? 'second' : 'seconds'),
            abbreviation: 's',
            matches: ['s', 'second', 'seconds', 'sec', 'secs'],
        },
        {
            key: 'm',
            name: c => (c === 1 ? 'minute' : 'minutes'),
            abbreviation: 'm',
            matches: ['m', 'minute', 'minutes', 'min', 'mins'],
        },
        {
            key: 'h',
            name: c => (c === 1 ? 'hour' : 'hours'),
            abbreviation: 'h',
            matches: ['h', 'hour', 'hours', 'hr', 'hrs'],
        },
        {
            key: 'd',
            name: c => (c === 1 ? 'day' : 'days'),
            abbreviation: 'd',
            matches: ['d', 'day', 'days'],
        },
        {
            key: 'w',
            name: c => (c === 1 ? 'week' : 'weeks'),
            abbreviation: 'w',
            matches: ['w', 'week', 'weeks', 'wk', 'wks'],
        },
        {
            key: 'mo',
            name: c => (c === 1 ? 'month' : 'months'),
            abbreviation: 'mo',
            matches: ['mo', 'month', 'months', 'mth', 'mths', 'mnth', 'mnths'],
        },
        {
            key: 'y',
            name: c => (c === 1 ? 'year' : 'years'),
            abbreviation: 'y',
            matches: ['y', 'year', 'years', 'yr', 'yrs'],
        },
        {
            key: 'dec',
            name: c => (c === 1 ? 'decade' : 'decades'),
            abbreviation: 'dec',
            matches: ['dec', 'decade', 'decades'],
        },
        {
            key: 'c',
            name: c => (c === 1 ? 'century' : 'centuries'),
            abbreviation: 'c',
            matches: ['c', 'century', 'centuries', 'hundred years'],
        },
        {
            key: 'kyr',
            name: c => (c === 1 ? 'millennium' : 'millenniums'),
            abbreviation: 'kyr',
            matches: ['kyr', 'millennium', 'millenniums', 'thousand years'],
        },
    ],
} as Language;
