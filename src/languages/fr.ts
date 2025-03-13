export default {
  decimal: ',',
  and: 'et',

  units: {
    nanosecond: {
      name: (c) => (c === 1 ? 'nanoseconde' : 'nanosecondes'),
      abbreviation: 'ns',
      matches: ['nanoseconde', 'nanosecondes', 'ns'],
    },
    microsecond: {
      name: (c) => (c === 1 ? 'microseconde' : 'microsecondes'),
      abbreviation: 'μs',
      matches: ['microseconde', 'microsecondes', 'μs'],
    },
    millisecond: {
      name: (c) => (c === 1 ? 'milliseconde' : 'millisecondes'),
      abbreviation: 'ms',
      matches: ['milliseconde', 'millisecondes', 'ms'],
    },
    second: {
      name: (c) => (c === 1 ? 'seconde' : 'secondes'),
      abbreviation: 's',
      matches: ['seconde', 'secondes', 's'],
    },
    minute: {
      name: (c) => (c === 1 ? 'minute' : 'minutes'),
      abbreviation: 'min',
      matches: ['minute', 'minutes', 'min'],
    },
    hour: {
      name: (c) => (c === 1 ? 'heure' : 'heures'),
      abbreviation: 'h',
      matches: ['heure', 'heures', 'h'],
    },
    day: {
      name: (c) => (c === 1 ? 'jour' : 'jours'),
      abbreviation: 'j',
      matches: ['jour', 'jours', 'j'],
    },
    week: {
      name: (c) => (c === 1 ? 'semaine' : 'semaines'),
      abbreviation: 'sem',
      matches: ['semaine', 'semaines', 'sem'],
    },
    month: {
      name: (_c) => 'mois', // In French, the singular and plural form is identical.
      abbreviation: 'mo',
      matches: ['mois', 'mo'],
    },
    year: {
      name: (c) => (c === 1 ? 'an' : 'ans'),
      abbreviation: 'an',
      matches: ['an', 'ans'],
    },
    decade: {
      name: (c) => (c === 1 ? 'décennie' : 'décennies'),
      abbreviation: 'dec',
      matches: ['décennie', 'décennies', 'dec'],
    },
    century: {
      name: (c) => (c === 1 ? 'siècle' : 'siècles'),
      abbreviation: 'siè',
      matches: ['siècle', 'siècles', 'siè'],
    },
    millennium: {
      name: (c) => (c === 1 ? 'millénaire' : 'millénaires'),
      abbreviation: 'mil',
      matches: ['millénaire', 'millénaires', 'mil'],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
