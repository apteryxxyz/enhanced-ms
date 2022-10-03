import { crossModulo, isNumber, pluraliseUnit } from './helpers';
import { defaultLanguageOptions, LanguageOptions } from './languages';
import measurements from './measurements';

export interface StringifyOptions {
    /** Include milliseconds in the output */
    includeMs?: boolean;
    /** Include sub milliseconds in the output */
    includeSubMs?: boolean;
    /** Use the short names of measurements */
    shortFormat?: boolean;
    /** Round the result to the highest unit */
    roundUp?: boolean;
}

export const defaultStringifyOptions: StringifyOptions = {
    includeMs: false,
    includeSubMs: false,
    shortFormat: false,
    roundUp: false,
};

/** Turn a number into an object containing all the parsed time */
function parseTime(input: number, includeMs?: boolean, includeSubMs?: boolean) {
    if (includeSubMs) includeMs = true;

    const round = input > 0 ? Math.floor : Math.ceil;

    const parsed: Record<string, number> = {
        y: round(input / measurements['y']),
        d: crossModulo(round(input / measurements['d']), 365),
        h: crossModulo(round(input / measurements['h']), 24),
        m: crossModulo(round(input / measurements['m']), 60),
        s: crossModulo(round(input / measurements['s']), 60),
    };

    if (includeMs) parsed['ms'] = crossModulo(round(input), 1000);
    if (includeSubMs) {
        parsed['us'] = crossModulo(round(input / measurements['us']), 1000);
        parsed['ns'] = crossModulo(round(input / measurements['ns']), 1000);
    }

    return parsed;
}

export default function (
    input: number,
    options: StringifyOptions = defaultStringifyOptions,
    language: LanguageOptions = defaultLanguageOptions
) {
    if (!isNumber(input)) throw new TypeError(`Exepected a number, received a ${typeof input}`);

    const parsedTime = parseTime(input, options.includeMs, options.includeSubMs);
    const timeEntries = Object.entries(parsedTime).filter(t => t[1] !== 0);
    if (timeEntries.length === 0) return null;

    const finalString = [];
    let firstUnit = language.units['ms'];
    let firstFinal = 0;

    const useCompact = options.roundUp === true;
    const hasShort = language.supportsAbbreviations === true;
    if (options.shortFormat && !hasShort) options.shortFormat = false;
    const useShort = options.shortFormat === true && hasShort;

    for (let i = 0; i < timeEntries.length; i++) {
        const entry = timeEntries[i];
        const unit = language.units[entry[0]];
        const amount = entry[1];

        if (useCompact && timeEntries.length > 1) {
            if (i === 0) {
                firstFinal = amount;
                firstUnit = unit;
                continue;
            } else {
                // Round the units up
                if (amount * unit.ms > firstUnit.ms / 2) firstFinal += 1;
                if (i < timeEntries.length - 1) continue;
            }

            const plural = pluraliseUnit(firstUnit, firstFinal, useShort);
            return `${Math.abs(firstFinal).toLocaleString()}${useShort ? '' : ' '}${plural}`;
        }

        const plural = pluraliseUnit(unit, amount, useShort);
        finalString.push(`${Math.abs(amount).toLocaleString()}${useShort ? '' : ' '}${plural}`);
    }

    if (finalString.length === 0) return null;

    if (useShort === false && finalString.length > 1) {
        // Add 'and' if using long format
        const lastItem = finalString.pop();
        finalString.push(language.andValue);
        finalString.push(lastItem);
    }

    return (input < 0 ? '-' : '') + finalString.join(' ');
}
