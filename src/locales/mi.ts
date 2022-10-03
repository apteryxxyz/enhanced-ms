import type { Language } from '../languages';

export default {
    decimal: '.',
    and: 'me te',

    units: [
        {
            key: 'ns',
            name: 'nano hēkona',
            matches: ['nano hēkona', 'nanohēkona', 'nano hekona', 'nanohekona'],
        },
        {
            key: 'us',
            name: 'moroiti hēkona',
            matches: ['moroiti hēkona', 'moroitihēkona', 'moroiti hekona', 'moroitihekona'],
        },
        {
            key: 'ms',
            name: 'manomano hēkona',
            matches: ['manomano hēkona', 'manomanohēkona', 'manomano hekona', 'manomanohekona'],
        },
        {
            key: 's',
            name: 'hēkona',
            matches: ['hēkona', 'hekona'],
        },
        {
            key: 'm',
            name: 'meneti',
            matches: ['meneti'],
        },
        {
            key: 'h',
            name: 'haora',
            matches: ['haora'],
        },
        {
            key: 'd',
            name: 'rā',
            matches: ['rā', 'ra'],
        },
        {
            key: 'w',
            name: 'wiki',
            matches: ['wiki'],
        },
        {
            key: 'mo',
            name: 'marama',
            matches: ['marama'],
        },
        {
            key: 'y',
            name: 'tau',
            matches: ['tau'],
        },
        {
            key: 'dec',
            name: 'tekau tau',
            matches: ['tekau tau', 'tekautau'],
        },
        {
            key: 'c',
            name: 'rau tau',
            matches: ['rau tau', 'rautau'],
        },
        {
            key: 'kyr',
            name: 'mano tau',
            matches: ['mano tau', 'manotau'],
        },
    ],
} as Language;
