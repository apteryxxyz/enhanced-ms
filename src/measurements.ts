/* eslint id-length: 0 */

export const measurements = {
    ns: 0.000_001,
    us: 0.001,
    ms: 1,
    s: 1_000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
    w: 604_800_000,
    mo: 2_628_000_000, // 28 days
    y: 31_536_000_000, // 365 days
    dec: 315_360_000_000, // 10 years
    c: 3_153_600_000_000, // 100 years
    kyr: 31_536_000_000_000, // 1000 years
};

export type MeasurementKey = keyof typeof measurements;

/** Check if a value is a measurement key. */
export function isMeasurementKey(key: unknown): key is MeasurementKey {
    return typeof key === 'string' && key in measurements;
}
