const ms = require('../')('en');
// const ms = require('enhanced-ms')('en');

test('convert single time units', () => {
    expect(ms('1m')).toBe(60000);
    expect(ms('5 minutes')).toBe(60000 * 5);

    expect(ms('3d')).toBe(86400000 * 3);
    expect(ms('13 days')).toBe(86400000 * 13);

    expect(ms('4y')).toBe(31536000000 * 4);
    expect(ms('1 year')).toBe(31536000000);
});

test('convert multiple time units', () => {
    expect(ms('2h 34m')).toBe(9240000);
    expect(ms('2 hours 34 minutes')).toBe(9240000);

    expect(ms('1d 34h')).toBe(208800000);
    expect(ms('1 day 34h')).toBe(208800000);

    expect(ms('1y 365d')).toBe(ms('2y'));
    expect(ms('1y 365 days')).toBe(ms('2y'));
});

test('math inside time units', () => {
    expect(ms('4h + 60m')).toBe(ms('5h'));
    expect(ms('1d + 1d + 1d + 1d + 1d + 1d + 1d')).toBe(ms('7d'));

    expect(ms('1d - 4h')).toBe(72000000);
    expect(ms('1 hour - 4 hours')).toBe(-10800000);

    expect(ms('7d / 7')).toBe(ms('1d'));
    expect(ms('365d / 365')).toBe(ms('1d'));

    expect(ms('24h * 7')).toBe(ms('7d'));
    expect(ms('1000ns * 1000')).toBe(ms('1ms'));
});
