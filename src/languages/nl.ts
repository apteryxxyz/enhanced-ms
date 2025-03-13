export default {
  decimal: ',',
  and: 'en',

  units: {
    nanosecond: {
      name: (c) => (c === 1 ? 'nanoseconde' : 'nanoseconden'),
      abbreviation: 'ns',
      matches: ['nanoseconde', 'nanoseconden', 'ns'],
    },
    microsecond: {
      name: (c) => (c === 1 ? 'microseconde' : 'microseconden'),
      abbreviation: 'μs',
      matches: ['microseconde', 'microseconden', 'μs'],
    },
    millisecond: {
      name: (c) => (c === 1 ? 'milliseconde' : 'milliseconden'),
      abbreviation: 'ms',
      matches: ['milliseconde', 'milliseconden', 'ms'],
    },
    second: {
      name: (c) => (c === 1 ? 'seconde' : 'seconden'),
      abbreviation: 's',
      matches: ['seconde', 'seconden', 's'],
    },
    minute: {
      name: (c) => (c === 1 ? 'minuut' : 'minuten'),
      abbreviation: 'min',
      matches: ['minuut', 'minuten', 'min'],
    },
    hour: {
      name: (c) => (c === 1 ? 'uur' : 'uren'),
      abbreviation: 'h',
      matches: ['uur', 'uren', 'h'],
    },
    day: {
      name: (c) => (c === 1 ? 'dag' : 'dagen'),
      abbreviation: 'd',
      matches: ['dag', 'dagen', 'd'],
    },
    week: {
      name: (c) => (c === 1 ? 'week' : 'weken'),
      abbreviation: 'w',
      matches: ['week', 'weken', 'w'],
    },
    month: {
      name: (c) => (c === 1 ? 'maand' : 'maanden'),
      abbreviation: 'mnd',
      matches: ['maand', 'maanden', 'mnd'],
    },
    year: {
      name: (c) => (c === 1 ? 'jaar' : 'jaren'),
      abbreviation: 'jr',
      matches: ['jaar', 'jaren', 'jr'],
    },
    decade: {
      name: (c) => (c === 1 ? 'decennium' : 'decennia'),
      abbreviation: 'dec',
      matches: ['decennium', 'decennia', 'dec'],
    },
    century: {
      name: (c) => (c === 1 ? 'eeuw' : 'eeuwen'),
      abbreviation: 'eeuw',
      matches: ['eeuw', 'eeuwen'],
    },
    millennium: {
      name: (c) => (c === 1 ? 'millennium' : 'millennia'),
      abbreviation: 'mil',
      matches: ['millennium', 'millennia', 'mil'],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
