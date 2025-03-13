export default {
  decimal: ',',
  and: 'y',

  units: {
    nanosecond: {
      name: (c) => (c === 1 ? 'nanosegundo' : 'nanosegundos'),
      abbreviation: 'ns',
      matches: ['nanosegundo', 'nanosegundos', 'ns'],
    },
    microsecond: {
      name: (c) => (c === 1 ? 'microsegundo' : 'microsegundos'),
      abbreviation: 'μs',
      matches: ['microsegundo', 'microsegundos', 'μs'],
    },
    millisecond: {
      name: (c) => (c === 1 ? 'milisegundo' : 'milisegundos'),
      abbreviation: 'ms',
      matches: ['milisegundo', 'milisegundos', 'ms'],
    },
    second: {
      name: (c) => (c === 1 ? 'segundo' : 'segundos'),
      abbreviation: 's',
      matches: ['segundo', 'segundos', 's'],
    },
    minute: {
      name: (c) => (c === 1 ? 'minuto' : 'minutos'),
      abbreviation: 'min',
      matches: ['minuto', 'minutos', 'min'],
    },
    hour: {
      name: (c) => (c === 1 ? 'hora' : 'horas'),
      abbreviation: 'h',
      matches: ['hora', 'horas', 'h'],
    },
    day: {
      name: (c) => (c === 1 ? 'día' : 'días'),
      abbreviation: 'd',
      matches: ['día', 'días', 'd'],
    },
    week: {
      name: (c) => (c === 1 ? 'semana' : 'semanas'),
      abbreviation: 'sem',
      matches: ['semana', 'semanas', 'sem'],
    },
    month: {
      name: (c) => (c === 1 ? 'mes' : 'meses'),
      abbreviation: 'mes',
      matches: ['mes', 'meses', 'mes'],
    },
    year: {
      name: (c) => (c === 1 ? 'año' : 'años'),
      abbreviation: 'a',
      matches: ['año', 'años', 'a'],
    },
    decade: {
      name: (c) => (c === 1 ? 'década' : 'décadas'),
      abbreviation: 'déc',
      matches: ['década', 'décadas', 'déc'],
    },
    century: {
      name: (c) => (c === 1 ? 'siglo' : 'siglos'),
      abbreviation: 'sig',
      matches: ['siglo', 'siglos', 'sig'],
    },
    millennium: {
      name: (c) => (c === 1 ? 'milenio' : 'milenios'),
      abbreviation: 'mil',
      matches: ['milenio', 'milenios', 'mil'],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
