export default {
  decimal: '.',
  and: 'and',

  units: {
    nanosecond: {
      name: (c) => (c === 1 ? 'nanosecond' : 'nanoseconds'),
      abbreviation: 'ns',
      matches: ['nanosecond', 'nanoseconds', 'ns'],
    },
    microsecond: {
      name: (c) => (c === 1 ? 'microsecond' : 'microseconds'),
      abbreviation: 'μs',
      matches: ['microsecond', 'microseconds', 'μs'],
    },
    millisecond: {
      name: (c) => (c === 1 ? 'millisecond' : 'milliseconds'),
      abbreviation: 'ms',
      matches: ['millisecond', 'milliseconds', 'ms'],
    },
    second: {
      name: (c) => (c === 1 ? 'second' : 'seconds'),
      abbreviation: 's',
      matches: ['second', 'seconds', 's'],
    },
    minute: {
      name: (c) => (c === 1 ? 'minute' : 'minutes'),
      abbreviation: 'm',
      matches: ['minute', 'minutes', 'm'],
    },
    hour: {
      name: (c) => (c === 1 ? 'hour' : 'hours'),
      abbreviation: 'h',
      matches: ['hour', 'hours', 'h'],
    },
    day: {
      name: (c) => (c === 1 ? 'day' : 'days'),
      abbreviation: 'd',
      matches: ['day', 'days', 'd'],
    },
    week: {
      name: (c) => (c === 1 ? 'week' : 'weeks'),
      abbreviation: 'w',
      matches: ['week', 'weeks', 'w'],
    },
    month: {
      name: (c) => (c === 1 ? 'month' : 'months'),
      abbreviation: 'mo',
      matches: ['month', 'months', 'mo'],
    },
    year: {
      name: (c) => (c === 1 ? 'year' : 'years'),
      abbreviation: 'y',
      matches: ['year', 'years', 'y'],
    },
    decade: {
      name: (c) => (c === 1 ? 'decade' : 'decades'),
      abbreviation: 'dec',
      matches: ['decade', 'decades', 'dec'],
    },
    century: {
      name: (c) => (c === 1 ? 'century' : 'centuries'),
      abbreviation: 'c',
      matches: ['century', 'centuries', 'c'],
    },
    millennium: {
      name: (c) => (c === 1 ? 'millennium' : 'millennia'),
      abbreviation: 'mil',
      matches: ['millennium', 'millennia', 'mil'],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
