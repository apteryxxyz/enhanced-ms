import type { Language } from '../languages';

export default {
    decimal: '.',
    and: 'me te',

    units: [
        {
            key: 'ns',
            long: 'nano hēkona',
            matches: ['nano hēkona', 'nanohēkona', 'nano hekona', 'nanohekona'],
        },
        {
            key: 'us',
            long: 'moroiti hēkona',
            matches: ['moroiti hēkona', 'moroitihēkona', 'moroiti hekona', 'moroitihekona'],
        },
        {
            key: 'ms',
            long: 'manomano hēkona',
            matches: ['manomano hēkona', 'manomanohēkona', 'manomano hekona', 'manomanohekona'],
        },
        {
            key: 's',
            long: 'hēkona',
            matches: ['hēkona', 'hekona'],
        },
        {
            key: 'm',
            long: 'meneti',
            matches: ['meneti'],
        },
        {
            key: 'h',
            long: 'haora',
            matches: ['haora'],
        },
        {
            key: 'd',
            long: 'ra',
            matches: ['ra'],
        },
        {
            key: 'w',
            long: 'wiki',
            matches: ['wiki'],
        },
        {
            key: 'mo',
            long: 'marama',
            matches: ['marama'],
        },
        {
            key: 'y',
            long: 'tau',
            matches: ['tau'],
        },
        {
            key: 'dec',
            long: 'tekau tau',
            matches: ['tekau tau', 'tekautau'],
        },
        {
            key: 'c',
            long: 'rau tau',
            matches: ['rau tau', 'rautau'],
        },
        {
            key: 'kyr',
            long: 'mano tau',
            matches: ['mano tau', 'manotau'],
        },
    ],
} as Language;
