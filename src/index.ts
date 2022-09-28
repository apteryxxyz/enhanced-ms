import { isNumber, isObject, isString } from './helpers';
import {
    defaultLanguageOptions,
    isLanguageKey,
    LanguageKey,
    makeLanguageOptions,
} from './languages';
import numberify, { defaultNumberifyOptions, NumberifyOptions } from './numberify';
import stringify, { defaultStringifyOptions, StringifyOptions } from './stringify';
export type Options = StringifyOptions & NumberifyOptions;

function formatOptions(options: Options, defaultOptions: Options) {
    return {
        ...defaultStringifyOptions,
        ...defaultNumberifyOptions,
        ...defaultOptions,
        ...options,
    } as Options;
}

let DEFAULT_OPTIONS = formatOptions({}, {});
let LANGUAGE_OPTIONS = defaultLanguageOptions;

/**
 * Convert a human readable time-frame string into milliseconds.
 * @param value1 String time-frame
 * @param value2 Language key **OR** options object
 * @param value3 Options object
 * @example
 * ```js
 * ms('1 day') === 86400000
 * ms('3m 34s') === 214000
 * ms(ms('1d - 4h')) === '20 hours'
 * ms(ms('7d / 7')) === '1 day'
 * ms('1 meneti', 'mi') === 60000
 * ```
 */
function ms(
    value1: string,
    value2?: LanguageKey | Options,
    value3?: Options
): ReturnType<typeof numberify>;
/**
 * Convert a number of millseconds into a human readable string.
 * @param value1 Number of milliseconds
 * @param value2 Language key **OR** options object
 * @param value3 Options object
 * @example
 * ```js
 * ms(123456) === '2 minutes and 3 seconds'
 * ms(123456, { shortFormat: true }) === '2m 3s'
 * ms(123456, { roundUp: true }) === '2 minutes'
 * ms(123456, { includeMs: true }) === '2 minutes 3 seconds and 456 milliseconds'
 * ms(123.456, { includeSubMs: true }) === '123 milliseconds and 456 microseconds'
 * ms(123456, 'mi') === '2 meneti me te 3 hēkona'
 * ```
 */
function ms(
    value1: number,
    value2?: LanguageKey | Options,
    value3?: Options
): ReturnType<typeof stringify>;
/**
 * Set the language for Enhanced MS to use.
 * @param value1 Language key
 * @returns The same function
 * ```js
 * ms(1000) === '1 second'
 * ms('mi') instanceof Function
 * ms(1000) === '1 hēkona'
 * ```
 */
function ms(value1: LanguageKey): typeof ms;
/**
 * Set the global options.
 * @param value1 Options object
 * @returns This same function
 * @example
 * ```js
 * ms(1234567) === '20 minutes and 34 seconds'
 * ms({ roundUp: true }) instanceof Function
 * ms(1234567) === '21 minutes'
 * ```
 */
function ms(value1: Options): typeof ms;
function ms(
    value1?: string | number | LanguageKey | Options,
    value2?: LanguageKey | Options,
    value3?: Options
): number | string | null | typeof ms {
    let options = DEFAULT_OPTIONS;
    let language = LANGUAGE_OPTIONS;

    const firstIsObject = isObject(value1);
    const secondIsObject = isObject(value2);
    const thirdIsObject = isObject(value3);

    if (firstIsObject || secondIsObject || thirdIsObject) {
        if (firstIsObject) {
            DEFAULT_OPTIONS = formatOptions(value1, DEFAULT_OPTIONS);
            return ms;
        } else {
            options = secondIsObject ? value2 : thirdIsObject ? value3 : DEFAULT_OPTIONS;
        }
    }

    const firstIsLanguage = isString(value1) && isLanguageKey(value1);
    const secondIsLanguage = isString(value2) && isLanguageKey(value2);

    if (firstIsLanguage || secondIsLanguage) {
        if (firstIsLanguage) {
            LANGUAGE_OPTIONS = makeLanguageOptions(value1);
            return ms;
        } else if (secondIsLanguage) {
            language = makeLanguageOptions(value2);
        }
    }

    if (isString(value1)) return numberify(value1, options, language);
    if (isNumber(value1)) return stringify(value1, options, language);

    throw new TypeError(`Invalid parameter(s)`);
}

export default ms;

module.exports = ms;
module.exports.default = ms;
