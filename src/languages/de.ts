// RIP @DEVTomatoCake

export default {
  decimal: ',',
  and: 'und',

  units: {
    nanosecond: {
      name: (c) => (c === 1 ? 'Nanosekunde' : 'Nanosekunden'),
      abbreviation: 'ns',
      matches: ['ns', 'nanos', 'nanosekunde', 'nanosekunden'],
    },
    microsecond: {
      name: (c) => (c === 1 ? 'Mikrosekunde' : 'Mikrosekunden'),
      abbreviation: 'μs',
      matches: ['us', 'mk', 'mikrosekunde', 'mikrosekunden', 'mikros'],
    },
    millisecond: {
      name: (c) => (c === 1 ? 'Millisekunde' : 'Millisekunden'),
      abbreviation: 'ms',
      matches: ['ms', 'ml', 'mi', 'millisekunde', 'millisekunden', 'millis'],
    },
    second: {
      name: (c) => (c === 1 ? 'Sekunde' : 'Sekunden'),
      abbreviation: 'Sek.',
      matches: ['s', 'sekunde', 'sekunden', 'sek', 'seks'],
    },
    minute: {
      name: (c) => (c === 1 ? 'Minute' : 'Minuten'),
      abbreviation: 'Min.',
      matches: ['m', 'minute', 'minuten', 'min', 'mins'],
    },
    hour: {
      name: (c) => (c === 1 ? 'Stunde' : 'Stunden'),
      abbreviation: 'Std.',
      matches: ['h', 'stunde', 'stunden', 'st'],
    },
    day: {
      name: (c) => (c === 1 ? 'Tag' : 'Tage'),
      abbreviation: 'T.',
      matches: ['d', 't', 'tag', 'tage'],
    },
    week: {
      name: (c) => (c === 1 ? 'Woche' : 'Wochen'),
      abbreviation: 'W.',
      matches: ['w', 'wo', 'woche', 'wochen'],
    },
    month: {
      name: (c) => (c === 1 ? 'Monat' : 'Monate'),
      abbreviation: 'M.',
      matches: ['mo', 'monat', 'monate'],
    },
    year: {
      name: (c) => (c === 1 ? 'Jahr' : 'Jahre'),
      abbreviation: 'J.',
      matches: ['y', 'a', 'j', 'jahr', 'jahre'],
    },
    decade: {
      name: (c) => (c === 1 ? 'Jahrzehnt' : 'Jahrzehnte'),
      abbreviation: 'Jz.',
      matches: ['jz', 'jahrzehnt', 'jahrzehnte'],
    },
    century: {
      name: (c) => (c === 1 ? 'Jahrhundert' : 'Jahrhunderte'),
      abbreviation: 'Jh.',
      matches: ['c', 'jh', 'jhd', 'jahrhundert', 'jahrhunderte'],
    },
    millennium: {
      name: (c) => (c === 1 ? 'Jahrtausend' : 'Jahrtausende'),
      abbreviation: 'Jt.',
      matches: ['jt', 'jtd', 'jtsd', 'jahrt', 'jahrtausend', 'jahrtausende'],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
