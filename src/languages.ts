import de from './locales/de';
import en from './locales/en';
import mi from './locales/mi';
import type { MeasurementKey } from './measurements';
import { measurements } from './measurements';

export const languages = { en, mi, de };

export type LanguageKey = keyof typeof languages;

export interface Language {
    /** The version of 'and' in this language */
    and: string;
    /** The decimal separator this language uses */
    decimal: ',' | '.';
    /** Measurement units */
    units: Unit[];
}

export interface Unit {
    /** Short form of the measurement */
    abbreviation?: string | ((count: number) => string);
    /** Key to identify this unit */
    key: MeasurementKey;
    /** Strings used for the string regex */
    matches: string[];
    /** Long form of the measurement */
    name: string | ((count: number) => string);
}

export interface LanguageOptions {
    /** The version of 'and' in the language */
    andValue: string;
    /** The decimal separator the language uses */
    decimalSeparator: string;
    /** The key for the selected language */
    key: LanguageKey;
    /** The regex to match lengths of time */
    regex: RegExp;
    /** Whether the language has full short support */
    supportsAbbreviations: boolean;
    /** The thousands separator the language uses */
    thousandsSeparator: string;
    /** The units and their names in the language, as a map */
    units: Record<string, Unit & { ms: number }>;
}

/** Check if a value is a language key. */
export function isLanguageKey(value: unknown): value is LanguageKey {
    return typeof value === 'string' && value in languages;
}

/** Resolve a language key from a list of values */
export function resolveLanguageKey(...keys: unknown[]) {
    for (const key of keys) if (isLanguageKey(key)) return key;
    return undefined;
}

const makeLanguageOptionsCache = new Map<LanguageKey, LanguageOptions>();

/** Convert a language object into a object this module can utilitise */
export function makeLanguageOptions(key: LanguageKey): LanguageOptions {
    const cachedOptions = makeLanguageOptionsCache.get(key);
    if (cachedOptions) return cachedOptions;

    const language: Language = languages[key];
    const thousands = language.decimal === ',' ? '.' : ',';
    const regex = new RegExp(
        '[-+*/]+|' + // Operators
            '[()]|' + // Brackets
            `(?![${language.decimal}${thousands}])` + // Dont match single .,
            `[\\d${language.decimal}${thousands}]+|` + // Numbers
            '(?<=\\s|\\d)(' +
            language.units
                .flatMap(({ matches }) => matches)
                .sort((a, b) => b.length - a.length)
                .join('|') +
            ')',
        'gi'
    );

    // Turn the units array into a map where every key is a match
    // This saves having to 'find' a match manually
    // `units.find(u => u.matches.includes(value))` vs `units[value]`
    const units = language.units.reduce<LanguageOptions['units']>(
        (all, cur) => {
            for (const match of [...cur.matches, cur.key])
                all[match] = Object.assign(cur, { ms: measurements[cur.key] });
            return all;
        },
        {}
    );

    const options = {
        key,
        decimalSeparator: language.decimal,
        thousandsSeparator: thousands,
        andValue: language.and,
        supportsAbbreviations: language.units.every(unit => unit.abbreviation),
        regex,
        units,
    };

    makeLanguageOptionsCache.set(key, options);

    return options;
}

/** The default language to use, in this case English */
export const defaultLanguageOptions = makeLanguageOptions('en');
