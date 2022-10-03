import type { Language } from '../languages';

export default {
    decimal: ',',
    and: 'und',

    units: [
        {
            key: 'ns',
            name: c => (c === 1 ? 'Nanosekunde' : 'Nanosekunden'),
            matches: ['ns', 'nanos', 'nanosekunde', 'nanosekunden'],
        },
        {
            key: 'us',
            name: c => (c === 1 ? 'Mikrosekunde' : 'Mikrosekunden'),
            matches: ['us', 'mk', 'mikrosekunde', 'mikrosekunden', 'mikros'],
        },
        {
            key: 'ms',
            name: c => (c === 1 ? 'Millisekunde' : 'Millisekunden'),
            matches: ['ms', 'ml', 'mi', 'millisekunde', 'millisekunden', 'millis'],
        },
        {
            key: 's',
            name: c => (c === 1 ? 'Sekunde' : 'Sekunden'),
            matches: ['s', 'sekunde', 'sekunden', 'sek', 'seks'],
        },
        {
            key: 'm',
            name: c => (c === 1 ? 'Minute' : 'Minuten'),
            matches: ['m', 'minute', 'minuten', 'min', 'mins'],
        },
        {
            key: 'h',
            name: c => (c === 1 ? 'Stunde' : 'Stunden'),
            matches: ['h', 'stunde', 'stunden', 'st'],
        },
        {
            key: 'd',
            name: c => (c === 1 ? 'Tag' : 'Tage'),
            matches: ['d', 't', 'tag', 'tage'],
        },
        {
            key: 'w',
            name: c => (c === 1 ? 'Woche' : 'Wochen'),
            matches: ['w', 'wo', 'woche', 'wochen'],
        },
        {
            key: 'mo',
            name: c => (c === 1 ? 'Monat' : 'Monate'),
            matches: ['mo', 'monat', 'monate'],
        },
        {
            key: 'y',
            name: c => (c === 1 ? 'Jahr' : 'Jahre'),
            matches: ['y', 'a', 'j', 'jahr', 'jahre'],
        },
        {
            key: 'dec',
            name: c => (c === 1 ? 'Jahrzehnt' : 'Jahrzehnte'),
            abbreviation: 'Jz.',
            matches: ['jz', 'jahrzehnt', 'jahrzehnte'],
        },
        {
            key: 'c',
            name: c => (c === 1 ? 'Jahrhundert' : 'Jahrhunderte'),
            abbreviation: 'Jh.',
            matches: ['c', 'jh', 'jhd', 'jahrhundert', 'jahrhunderte'],
        },
        {
            key: 'kyr',
            name: c => (c === 1 ? 'Jahrtausend' : 'Jahrtausende'),
            abbreviation: 'Jt.',
            matches: ['jt', 'jtd', 'jtsd', 'jahrt', 'jahrtausend', 'jahrtausende'],
        },
    ],
} as Language;
