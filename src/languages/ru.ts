type Unit = keyof typeof UnitsMap;
const UnitsMap = {
  наносекунды: ['наносекунда', 'наносекунды', 'наносекунд'],
  микросекунды: ['микросекунда', 'микросекунды', 'микросекунд'],
  миллисекунды: ['миллисекунда', 'миллисекунды', 'миллисекунд'],
  секунды: ['секунда', 'секунды', 'секунд'],
  минуты: ['минута', 'минуты', 'минут'],
  часы: ['час', 'часа', 'часов'],
  дни: ['день', 'дня', 'дней'],
  недели: ['неделя', 'недели', 'недель'],
  месяцы: ['месяц', 'месяца', 'месяцев'],
  годы: ['год', 'года', 'лет'],
  десятилетия: ['десятилетие', 'десятилетия', 'десятилетий'],
  века: ['век', 'века', 'веков'],
  тысячелетия: ['тысячелетие', 'тысячелетия', 'тысячелетий'],
} as const;

function formatTime(unit: Unit, count: number) {
  const words = UnitsMap[unit];

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  let word: string;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) word = words[2]!;
  else if (lastDigit === 1) word = words[0]!;
  else if (lastDigit >= 2 && lastDigit <= 4) word = words[1]!;
  else word = words[2]!;

  return word || '';
}

export default {
  decimal: '.',
  and: 'и',

  units: {
    nanosecond: {
      name: (c) => formatTime('наносекунды', c),
      abbreviation: 'нс',
      matches: ['нс', 'наносекунда', 'наносекунд', 'наносекунды'],
    },
    microsecond: {
      name: (c) => formatTime('микросекунды', c),
      abbreviation: 'мкс',
      matches: ['мкс', 'микросекунда', 'микросекунд', 'микросекунды'],
    },
    millisecond: {
      name: (c) => formatTime('миллисекунды', c),
      abbreviation: 'мс',
      matches: ['мс', 'миллисекунда', 'миллисекунд', 'миллисекунды', 'мсек'],
    },
    second: {
      name: (c) => formatTime('секунды', c),
      abbreviation: 'с',
      matches: ['с', 'секунда', 'секунд', 'секунды', 'сек'],
    },
    minute: {
      name: (c) => formatTime('минуты', c),
      abbreviation: 'м',
      matches: ['м', 'минута', 'минуты', 'минут', 'мин'],
    },
    hour: {
      name: (c) => formatTime('часы', c),
      abbreviation: 'ч',
      matches: ['ч', 'час', 'часа', 'часов'],
    },
    day: {
      name: (c) => formatTime('дни', c),
      abbreviation: 'д',
      matches: ['д', 'день', 'дня', 'дней'],
    },
    week: {
      name: (c) => formatTime('недели', c),
      abbreviation: 'н',
      matches: ['н', 'неделя', 'недели', 'недель'],
    },
    month: {
      name: (c) => formatTime('месяцы', c),
      abbreviation: 'мес',
      matches: ['мес', 'месяц', 'месяца', 'месяцев'],
    },
    year: {
      name: (c) => formatTime('годы', c),
      abbreviation: 'г',
      matches: ['г', 'год', 'года', 'лет', 'л'],
    },
    decade: {
      name: (c) => formatTime('десятилетия', c),
      abbreviation: 'дсл',
      matches: [
        'десятилетие',
        'десятилетия',
        'десятилетий',
        'десятков лет',
        'десятка лет',
        'десяток лет',
      ],
    },
    century: {
      name: (c) => formatTime('века', c),
      abbreviation: 'вк',
      matches: ['век', 'века', 'веков'],
    },
    millennium: {
      name: (c) => formatTime('тысячелетия', c),
      abbreviation: 'тыс',
      matches: [
        'тыс',
        'тысячелетие',
        'тысячалетия',
        'тысячалетий',
        'тысяча лет',
        'тысячи лет',
        'тысяч лет',
      ],
    },
  },
} satisfies import('./helpers/definition-types').LanguageDefinition;
