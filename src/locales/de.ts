import type { Language } from '../languages';

export default {
    decimal: ',',
    and: 'und',

    units: [
        {
            key: 'ns',
            long: c => (c === 1 ? 'Nanosekunde' : 'Nanosekunden'),
            short: 'ns',
            matches: ['ns', 'nanosecond', 'nanoseconds'],
        },
        {
            key: 'us',
            long: c => (c === 1 ? 'Mikrosekunde' : 'Mikrosekunden'),
            short: 'us',
            matches: ['us', 'microsecond', 'microseconds', 'mikrosekunde', 'mikrosekunden'],
        },
        {
            key: 'ms',
            long: c => (c === 1 ? 'Millisekunde' : 'Millisekunden'),
            short: 'ms',
            matches: ['ms', 'millisecond', 'microseconds', 'millisekunde', 'millisekunden', 'mi'],
        },
        {
            key: 's',
            long: c => (c === 1 ? 'Sekunde' : 'Sekunden'),
            short: 's',
            matches: ['s', 'second', 'seconds', 'sec', 'secs', 'sekunde', 'sekunden', 'sek'],
        },
        {
            key: 'm',
            long: c => (c === 1 ? 'Minute' : 'Minuten'),
            short: 'm',
            matches: ['m', 'minute', 'minutes', 'min', 'mins', 'minuten', 'mi'],
        },
        {
            key: 'h',
            long: c => (c === 1 ? 'Stunde' : 'Stunden'),
            short: 'h',
            matches: ['h', 'hour', 'hours', 'hr', 'hrs', 'stunde', 'stunden', 'st'],
        },
        {
            key: 'd',
            long: c => (c === 1 ? 'Tag' : 'Tage'),
            short: 'd',
            matches: ['d', 'day', 'days', 'tag', 'tage', 't'],
        },
        {
            key: 'w',
            long: c => (c === 1 ? 'Woche' : 'Wochen'),
            short: 'w',
            matches: ['w', 'week', 'weeks', 'wk', 'wks', 'woche', 'wochen', 'wo'],
        },
        {
            key: 'mo',
            long: c => (c === 1 ? 'Monat' : 'Monate'),
            short: 'mo',
            matches: ['mo', 'month', 'months', 'mth', 'mths', 'mnth', 'mnths', 'monat', 'monate'],
        },
        {
            key: 'y',
            long: c => (c === 1 ? 'Jahr' : 'Jahre'),
            short: 'y',
            matches: ['y', 'year', 'years', 'yr', 'yrs', 'j', 'jahr', 'jahre'],
        },
        {
            key: 'dec',
            long: c => (c === 1 ? 'Jahrzehnt' : 'Jahrzehnte'),
            short: 'dec',
            matches: ['dec', 'decade', 'decades', 'jahrzehnt', 'jahrzehnte', 'zehn jahre'],
        },
        {
            key: 'c',
            long: c => (c === 1 ? 'Jahrhundert' : 'Jahrhunderte'),
            short: 'c',
            matches: ['c', 'century', 'centuries', 'hundred years', 'jahrhundert', 'jahrhunderte', 'hundert jahre'],
        },
        {
            key: 'kyr',
            long: c => (c === 1 ? 'Jahrtausend' : 'Jahrtausende'),
            short: 'kyr',
            matches: ['kyr', 'millennium', 'millenniums', 'thousand years', 'jahrtausend', 'jahrtausende', 'tausend jahre', 'jt'],
        },
    ],
} as Language;
