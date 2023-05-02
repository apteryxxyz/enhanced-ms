import type { Language } from '../languages';

export default {
    decimal: '.',
    and: 'me te', // me ngā (plural)

    units: [
        {
            key: 'ns',
            name: 'hēkona nanomiri',
            matches: [
                'hēkona nanomiri',
                'hēkonananomiri',
                'hekona nanomiri',
                'hekonananomiri',
            ],
        },
        {
            key: 'us',
            name: 'hēkona miriona',
            matches: [
                'hēkona miriona',
                'hēkonamiriona',
                'hekona miriona',
                'hekonamiriona',
            ],
        },
        {
            key: 'ms',
            name: 'hēkona miri',
            matches: ['hēkona miri', 'kākonamiri', 'hekona miri', 'hekonamiri'],
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
            name: 'hāora',
            matches: ['hāora', 'haora'],
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
            matches: ['tau', 'houanga'],
        },
        {
            key: 'dec',
            name: 'tekau tau',
            matches: ['tekautau', 'tekau tau'],
        },
        {
            key: 'c',
            name: 'rau tau',
            matches: ['rautau', 'rau tau'],
        },
        {
            key: 'kyr',
            name: 'mano tau',
            matches: ['manotau', 'mano tau'],
        },
    ],
} as Language;
