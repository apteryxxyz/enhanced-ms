import type { Language } from '../languages';

export default {
    decimal: ',',
    and: 'und',

    units: [
        {
            key: 'ns',
            long: c => (c === 1 ? 'Nanosekunde' : 'Nanosekunden'),
            matches: ['ns', 'nanos', 'nanosekunde', 'nanosekunden'],
        },
        {
            key: 'us',
            long: c => (c === 1 ? 'Mikrosekunde' : 'Mikrosekunden'),
            matches: ['us', 'mk', 'mikrosekunde', 'mikrosekunden', 'mikros'],
        },
        {
            key: 'ms',
            long: c => (c === 1 ? 'Millisekunde' : 'Millisekunden'),
            matches: ['ms', 'ml', 'mi', 'millisekunde', 'millisekunden', 'millis'],
        },
        {
            key: 's',
            long: c => (c === 1 ? 'Sekunde' : 'Sekunden'),
            matches: ['s', 'sekunde', 'sekunden', 'sek', 'seks'],
        },
        {
            key: 'm',
            long: c => (c === 1 ? 'Minute' : 'Minuten'),
            matches: ['m', 'minute', 'minuten', 'min', 'mins'],
        },
        {
            key: 'h',
            long: c => (c === 1 ? 'Stunde' : 'Stunden'),
            matches: ['h', 'stunde', 'stunden', 'st'],
        },
        {
            key: 'd',
            long: c => (c === 1 ? 'Tag' : 'Tage'),
            matches: ['d', 't', 'tag', 'tage'],
        },
        {
            key: 'w',
            long: c => (c === 1 ? 'Woche' : 'Wochen'),
            matches: ['w', 'wo', 'woche', 'wochen'],
        },
        {
            key: 'mo',
            long: c => (c === 1 ? 'Monat' : 'Monate'),
            matches: ['mo', 'monat', 'monate'],
        },
        {
            key: 'y',
            long: c => (c === 1 ? 'Jahr' : 'Jahre'),
            matches: ['y', 'a', 'j', 'jahr', 'jahre'],
        },
        {
            key: 'dec',
            long: c => (c === 1 ? 'Jahrzehnt' : 'Jahrzehnte'),
            short: 'Jz.',
            matches: ['jz', 'jahrzehnt', 'jahrzehnte'],
        },
        {
            key: 'c',
            long: c => (c === 1 ? 'Jahrhundert' : 'Jahrhunderte'),
            short: 'Jh.',
            matches: ['c', 'jh', 'jhd', 'jahrhundert', 'jahrhunderte'],
        },
        {
            key: 'kyr',
            long: c => (c === 1 ? 'Jahrtausend' : 'Jahrtausende'),
            short: 'Jt',
            matches: ['jt', 'jtd', 'jtsd', 'jahrt', 'jahrtausend', 'jahrtausende'],
        },
    ],
} as Language;
