import type { LanguageOptions, Unit } from './languages';
import { defaultLanguageOptions } from './languages';
import { measurements } from './measurements';

/** Options to pass to the format function. */
export interface FormatOptions {
    /** Include input in the output. */
    includeMs?: boolean;
    /** Include sub input in the output. */
    includeSubMs?: boolean;
    /** Insert commas inbetween each unit. */
    insertCommas?: boolean;
    /** Round the result to the highest unit. */
    roundUp?: boolean;
    /** Use the short names of measurements. */
    shortFormat?: boolean;
}

export const defaultFormatOptions: FormatOptions = {
    includeMs: false,
    includeSubMs: false,
    insertCommas: false,
    shortFormat: false,
    roundUp: false,
};

export function format(
    input: number,
    options: FormatOptions = defaultFormatOptions,
    language: LanguageOptions = defaultLanguageOptions
) {
    const { includeMs, includeSubMs, insertCommas, roundUp, shortFormat } =
        options;
    const { units, supportsAbbreviations, andValue, thousandsSeparator } =
        language;

    // If the time is less than 1 second and milliseconds are not included, return null
    const isNegative = input < 0;
    if (isNegative) input = Math.abs(input);
    if (!includeMs && !includeSubMs && input < 1_000) return null;

    const parsedTime = parseTime(
        input,
        includeMs === true,
        includeSubMs === true || roundUp === true
    );
    const timeEntries: [string, number][] = [];
    // eslint-disable-next-line guard-for-in
    for (const key in parsedTime) {
        const value = parsedTime[key];
        if (value > 0) timeEntries.push([key, value]);
    }

    if (timeEntries.length === 0) return null;

    const resultPrefix = isNegative ? '-' : '';
    const useShort = shortFormat && supportsAbbreviations;

    if (roundUp) {
        const highestUnit = units[timeEntries[0][0]];
        let totalValue = timeEntries[0][1];

        for (let i = timeEntries.length - 2; i >= 0; i--) {
            const [key, value] = timeEntries[i];
            if (value * units[key].ms > 0) {
                if (key === highestUnit.key) totalValue += 1;
                else timeEntries[i][1] += 1;
            }
        }

        return addThousandsSeparators(
            resultPrefix + formatResult(totalValue, highestUnit, useShort),
            thousandsSeparator,
            totalValue >= 1_000
        );
    }

    const timeStrings = timeEntries.map(([key, value]) => {
        return formatResult(value, units[key], useShort);
    });

    const totalLength = timeStrings.length;
    if (!useShort && totalLength > 1)
        timeStrings[totalLength - 1] = `${andValue} ${
            timeStrings[totalLength - 1]
        }`;

    return addThousandsSeparators(
        `${resultPrefix}${timeStrings.join(
            useShort || !insertCommas ? ' ' : ', '
        )}`,
        thousandsSeparator,
        timeEntries.some(([_, value]) => value > 999)
    );
}

// HELPERS

/** Pluraluse a unit */
function pluraliseUnit(unit: Unit, count: number, useShort: boolean) {
    const abbreviation =
        typeof unit.abbreviation === 'function'
            ? unit.abbreviation(Math.abs(count))
            : unit.abbreviation;
    const name =
        typeof unit.name === 'function'
            ? unit.name(Math.abs(count))
            : unit.name;
    return useShort && abbreviation ? abbreviation : name;
}

/** Parse a time in milliseconds into an object of units. */
function parseTime(
    milliseconds: number,
    includeMs: boolean = false,
    includeSubMs: boolean = false
): Record<string, number> {
    if (includeSubMs) includeMs = true;
    const round = milliseconds > 0 ? Math.floor : Math.ceil;

    return {
        y: round(milliseconds / measurements.y),
        d: round(milliseconds / measurements.d) % 365,
        h: round(milliseconds / measurements.h) % 24,
        m: round(milliseconds / measurements.m) % 60,
        s: round(milliseconds / measurements.s) % 60,

        ms: includeMs ? round(milliseconds) % 1_000 : -1,
        us: includeSubMs ? round(milliseconds / measurements.us) % 1_000 : -1,
        ns: includeSubMs ? round(milliseconds / measurements.ns) % 1_000 : -1,
    };
}

/** Format a result. */
function formatResult(amount: number, unit: Unit, useShort: boolean = false) {
    return `${amount}${useShort ? '' : ' '}${pluraliseUnit(
        unit,
        amount,
        useShort
    )}`;
}

/** Format the result to include thousands separators. */
function addThousandsSeparators(
    value: string,
    separator: string,
    needsSeparators: boolean
) {
    if (!needsSeparators) return value;
    // Using a regex is faster than Number#toLocaleString
    return value.replaceAll(/\B(?=(?:\d{3})+(?!\d))/g, separator);
}
