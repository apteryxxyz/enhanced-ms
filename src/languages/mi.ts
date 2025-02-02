export default {
  decimal: '.',
  and: 'me te',

  units: {
    nanosecond: {
      name: 'hēkona nanomiri',
      matches: [
        'hēkona nanomiri',
        'hēkonananomiri',
        'hekona nanomiri',
        'hekonananomiri',
      ],
    },
    microsecond: {
      name: 'hēkona miriona',
      matches: [
        'hēkona miriona',
        'hēkonamiriona',
        'hekona miriona',
        'hekonamiriona',
      ],
    },
    millisecond: {
      name: 'hēkona miri',
      matches: ['hēkona miri', 'kākonamiri', 'hekona miri', 'hekonamiri'],
    },
    second: {
      name: 'hēkona',
      matches: ['hēkona', 'hekona'],
    },
    minute: {
      name: 'meneti',
      matches: ['meneti'],
    },
    hour: {
      name: 'hāora',
      matches: ['hāora', 'haora'],
    },
    day: {
      name: 'rā',
      matches: ['rā', 'ra'],
    },
    week: {
      name: 'wiki',
      matches: ['wiki'],
    },
    month: {
      name: 'marama',
      matches: ['marama'],
    },
    year: {
      name: 'tau',
      matches: ['tau', 'houanga'],
    },
    decade: {
      name: 'tekau tau',
      matches: ['tekautau', 'tekau tau'],
    },
    century: {
      name: 'rau tau',
      matches: ['rautau', 'rau tau'],
    },
    millennium: {
      name: 'mano tau',
      matches: ['manotau', 'mano tau'],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
