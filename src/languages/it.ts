export default {
  decimal: ',',
  and: 'e',

  units: {
    nanosecond: {
      name: (c) => (c === 1 ? 'nanosecondo' : 'nanosecondi'),
      abbreviation: 'ns',
      matches: ['nanosecondo', 'nanosecondi', 'ns'],
    },
    microsecond: {
      name: (c) => (c === 1 ? 'microsecondo' : 'microsecondi'),
      abbreviation: 'μs',
      matches: ['microsecondo', 'microsecondi', 'μs'],
    },
    millisecond: {
      name: (c) => (c === 1 ? 'millisecondo' : 'millisecondi'),
      abbreviation: 'ms',
      matches: ['millisecondo', 'millisecondi', 'ms'],
    },
    second: {
      name: (c) => (c === 1 ? 'secondo' : 'secondi'),
      abbreviation: 's',
      matches: ['secondo', 'secondi', 's'],
    },
    minute: {
      name: (c) => (c === 1 ? 'minuto' : 'minuti'),
      abbreviation: 'min',
      matches: ['minuto', 'minuti', 'min'],
    },
    hour: {
      name: (c) => (c === 1 ? 'ora' : 'ore'),
      abbreviation: 'h',
      matches: ['ora', 'ore', 'h'],
    },
    day: {
      name: (c) => (c === 1 ? 'giorno' : 'giorni'),
      abbreviation: 'g',
      matches: ['giorno', 'giorni', 'g'],
    },
    week: {
      name: (c) => (c === 1 ? 'settimana' : 'settimane'),
      abbreviation: 'sett',
      matches: ['settimana', 'settimane', 'sett'],
    },
    month: {
      name: (c) => (c === 1 ? 'mese' : 'mesi'),
      abbreviation: 'mes',
      matches: ['mese', 'mesi', 'mes'],
    },
    year: {
      name: (c) => (c === 1 ? 'anno' : 'anni'),
      abbreviation: 'a',
      matches: ['anno', 'anni', 'a'],
    },
    decade: {
      name: (c) => (c === 1 ? 'decennio' : 'decenni'),
      abbreviation: 'dec',
      matches: ['decennio', 'decenni', 'dec'],
    },
    century: {
      name: (c) => (c === 1 ? 'secolo' : 'secoli'),
      abbreviation: 'sc',
      matches: ['secolo', 'secoli', 'sc'],
    },
    millennium: {
      name: (c) => (c === 1 ? 'millennio' : 'millenni'),
      abbreviation: 'mil',
      matches: ['millennio', 'millenni', 'mil'],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
