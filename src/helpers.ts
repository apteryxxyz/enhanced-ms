import type { Unit } from './languages';

/** Check that an value is an object. */
export function isObject(value: unknown): value is object {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}

/** Check that an value is a string. */
export function isString(value: unknown): value is string {
    return typeof value === 'string' || value instanceof String;
}

/** Check that an value is a number. */
export function isNumber(value: unknown): value is number {
    return !Number.isNaN(value) && Number.isFinite(value);
}

let EMIT_BIGINT_WARNING = true;

/** Modulo that works with large numbers. */
export function crossModulo(divident: number, divisor: number) {
    if (divident < Number.MAX_SAFE_INTEGER) return divident % divisor;
    if (typeof BigInt !== 'undefined') return Number(BigInt(divident) % BigInt(divisor));
    if (EMIT_BIGINT_WARNING) {
        console.warn(
            `${divident} is above JavaScripts' MAX_SAFE_INTEGER and`,
            'BigInt is unavailable, enhanced-ms may return an inaccurate result'
        );
        EMIT_BIGINT_WARNING = false;
    }
    return divident % divisor;
}

/** Pluraluse a unit */
export function pluraliseUnit(unit: Unit, count: number, compact: boolean) {
    const short = unit.short
        ? typeof unit.short === 'string'
            ? unit.short
            : unit.short(Math.abs(count))
        : (compact = false);
    const long = typeof unit.long === 'string' ? unit.long : unit.long(Math.abs(count));
    return compact ? short : long;
}
