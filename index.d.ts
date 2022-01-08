/** An object of options. */
export interface Options {
    /* Include milliseconds in output */
    includeMs?: boolean;
    /* Include micro and nanoseconds in output */
    includeSubMs?: boolean;
    /* Include and as before last unit in the output */
    includeAnd?: boolean;
    /* Use the symbol known as mu for microseconds */
    useMu?: boolean;
    /* Use the long name for each unit */
    verbose?: boolean;
    /* Round the time to a single unit */
    compact?: boolean;
}

/** An object containing the parsed time. */
export interface Parsed {
    /** Number of years */
    years: number;
    /** Number of extra days */
    days: number;
    /** Number of extra hours */
    hours: number;
    /** Number of extra minutes */
    minutes: number;
    /** Number of extra seconds */
    seconds: number;
    /** Number of extra milliseconds */
    milliseconds?: number;
    /** Number of extra sub-milliseconds */
    microseconds?: number;
    /** Number of extra nanoseconds */
    nanoseconds?: number;
}

/**
 * Convert a number of milliseconds to a human readable string or vice versa.
 * @param value A number, a string, or object of options to set as defaults.
 * @param options An object of options to override the defaults.
 */
declare function ms(value: number | string | Options, options?: Options): any;

declare module ms {
    /**
     * Convert a number of milliseconds to a human readable string.
     * @param value A number in milliseconds.
     * @param options An object of options to override the defaults.
     */
    export function stringify(value: number, options?: Options): any;

    /**
     * Convert a human readable string of time units to a number of milliseconds.
     * @param value A string of time units.
     */
    export function numberify(value: string): number;

    /**
     * Check if a value is an object.
     * @param value Any value.
     */
    export function isObject(value: any): boolean;

    /**
     * Check if a value is a string.
     * @param value Any value.
     */
    export function isString(value: any): boolean;

    /**
     * Check if a value is a number.
     * @param value Any value.
     */
    export function isNumber(value: any): boolean;

    /**
     * Convert a number of milliseconds to an object of time units.
     * @param number A number of milliseconds.
     * @param includeMs Whether or not to include milliseconds in the output.
     * @param includeSubMs Whether or not to include sub-milliseconds in the output.
     */
    export function parse(number: number, includeMs?: boolean, includeSubMs?: boolean): Parsed;

    /**
     * Pluralize a time unit.
     * @param word A word to pluralize.
     * @param amount If this number is greater than 1, the word will be pluralized.
     */
    export function pluralize(word: string, amount: number): string;

    export const units: Object;
}

export default ms;
