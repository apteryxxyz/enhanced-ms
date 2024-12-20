import type { Language } from '../languages';

function formatTime(value: number, unit: string): string {
    const units = {
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
    };

    const words = units[unit as keyof typeof units];
    if (!words) {
        throw new Error(`Неизвестный формат времени: ${unit}`);
    }

    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    let word: string;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        word = words[2];
    } else if (lastDigit === 1) {
        word = words[0];
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        word = words[1];
    } else {
        word = words[2];
    }

    return `${word}`;
}

export default {
    decimal: '.',
    and: 'и',

    units: [
        {
            key: 'ns',
            name: (c: number) => formatTime(c, 'наносекунды'),
            abbreviation: 'нс',
            matches: ['нс', 'наносекунда', 'наносекунд', 'наносекунды'],
        },
        {
            key: 'us',
            name: (c: number) => formatTime(c, 'микросекунды'),
            abbreviation: 'мкс',
            matches: ['мкс', 'микросекунда', 'микросекунд', 'микросекунды'],
        },
        {
            key: 'ms',
            name: (c: number) => formatTime(c, 'миллисекунды'),
            abbreviation: 'мс',
            matches: ['мс', 'миллисекунда', 'миллисекунд', 'миллисекунды', 'мсек'],
        },
        {
            key: 's',
            name: (c: number) => formatTime(c, 'секунды'),
            abbreviation: 'с',
            matches: ['с', 'секунда', 'секунд', 'секунды', 'сек'],
        },
        {
            key: 'm',
            name: (c: number) => formatTime(c, 'минуты'),
            abbreviation: 'м',
            matches: ['м', 'минута', 'минуты', 'минут', 'мин'],
        },
        {
            key: 'h',
            name: (c: number) => formatTime(c, 'часы'),
            abbreviation: 'ч',
            matches: ['ч', 'час', 'часа', 'часов'],
        },
        {
            key: 'd',
            name: (c: number) => formatTime(c, 'дни'),
            abbreviation: 'д',
            matches: ['д', 'день', 'дня', 'дней'],
        },
        {
            key: 'w',
            name: (c: number) => formatTime(c, 'недели'),
            abbreviation: 'н',
            matches: ['н', 'неделя', 'недели', 'недель'],
        },
        {
            key: 'mo',
            name: (c: number) => formatTime(c, 'месяцы'),
            abbreviation: 'мес',
            matches: ['мес', 'месяц', 'месяца', 'месяцев'],
        },
        {
            key: 'y',
            name: (c: number) => formatTime(c, 'годы'),
            abbreviation: 'г',
            matches: ['г', 'год', 'года', 'лет', 'л'],
        },
        {
            key: 'dec',
            name: (c: number) => formatTime(c, 'десятилетия'),
            abbreviation: 'дсл',
            matches: ['десятилетие', 'десятилетия', 'десятилетий', 'десятков лет', 'десятка лет', 'десяток лет'],
        },
        {
            key: 'c',
            name: (c: number) => formatTime(c, 'века'),
            abbreviation: 'вк',
            matches: ['век', 'века', 'веков'],
        },
        {
            key: 'kyr',
            name: (c: number) => formatTime(c, 'тысячелетия'),
            abbreviation: 'тыс',
            matches: ['тыс', 'тысячелетие', 'тысячалетия', 'тысячалетий', 'тысяча лет', 'тысячи лет', 'тысяч лет'],
        },
    ],
} satisfies Language;
