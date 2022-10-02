import measurements from './measurements';

import en from './locales/en';
import mi from './locales/mi';
const languages = { en, mi };
export default languages;

export interface Unit {
    /** Key to identify this unit */
    key: keyof typeof measurements;
    /** Long form of the measurement */
    long: string | ((count: number) => string);
    /** Short form of the measurement */
    short?: string | ((count: number) => string);
    /** Strings used for the string regex */
    matches: string[];
}

export interface Language {
    /** The decimal separator this language uses */
    decimal: '.' | ',';
    /** The version of 'and' in this language */
    and: string;
    /** Measurement units */
    units: Unit[];
}

export interface LanguageOptions {
    /** The key for the selected language */
    key: LanguageKey;
    /** The decimal separator the language uses */
    decimal: string;
    /** The thousands separator the language uses */
    thousands: string;
    /** The version of 'and' in the language */
    and: string;
    /** Whether the language has full short support */
    short: boolean;
    /** The regex to match lengths of time */
    regex: RegExp;
    /** The units and their names in the language, as a map */
    units: Record<string, Unit & { ms: number }>;
}

export type LanguageKey = keyof typeof languages;

/** Check that a string is a valid language key */
export function isLanguageKey(value: string): value is LanguageKey {
    return value in languages;
}

const LANGUAGE_CACHE: Record<string, LanguageOptions> = {};

/** Convert a language object into a object this module can utilitise */
export function makeLanguageOptions(key: LanguageKey): LanguageOptions {
    if (LANGUAGE_CACHE[key]) return LANGUAGE_CACHE[key];

    const language = languages[key];
    const decimal = language.decimal;
    const thousands = decimal === '.' ? ',' : '.';

    const regex = new RegExp(
        '([-+*/]+|' + // Operators
            '[()]|' +
            `(?![${decimal}${thousands}])` + // Dont match single .,
            `[\\d${decimal}${thousands}]+|` + // Numbers
            language.units // Units
                .map(u => u.matches)
                .flat()
                .sort((a, b) => b.length - a.length)
                .join('|') +
            ')',
        'gi'
    );

    // Turn the units array into a map where every key is a match
    // This saves having to 'find' a match manually
    // `units.find(u => u.matches.includes(value))` vs `units[value]`
    const units = language.units.reduce((all, cur) => {
        for (const match of [...cur.matches, cur.key])
            all[match] = Object.assign(cur, { ms: measurements[cur.key] });
        return all;
    }, {} as LanguageOptions['units']);

    return {
        key,
        decimal,
        thousands,
        and: language.and,
        short: language.units.some(u => u.short),
        regex,
        units,
    };
}

/** The default language to use, in this case English */
export const defaultLanguageOptions = makeLanguageOptions('en');
