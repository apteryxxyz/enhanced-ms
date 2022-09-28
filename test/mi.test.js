const ms = require('../')('mi');
// const ms = require('enhanced-ms')('mi');

test('convert single time units', () => {
    expect(ms('1 meneti')).toBe(60000);
    expect(ms('5 meneti')).toBe(60000 * 5);

    expect(ms('3 ra')).toBe(86400000 * 3);
    expect(ms('13 ra')).toBe(86400000 * 13);

    expect(ms('4 tau')).toBe(31536000000 * 4);
    expect(ms('1 tau')).toBe(31536000000);
});

test('convert multiple time units', () => {
    expect(ms('2 haora 34 meneti')).toBe(9240000);
    expect(ms('2 haora 34 meneti')).toBe(9240000);

    expect(ms('1 ra 34 haora')).toBe(208800000);
    expect(ms('1 ra 34 haora')).toBe(208800000);

    expect(ms('1 tau 365 ra')).toBe(ms('2y', 'en'));
    expect(ms('1 tau 365 ra')).toBe(ms('2y', 'en'));
});

test('math inside time units', () => {
    expect(ms('4 haora + 60 meneti')).toBe(ms('5h', 'en'));
    expect(ms('1 ra '.repeat(7))).toBe(ms('7d', 'en'));

    expect(ms('1 ra - 4 haora')).toBe(ms('20h', 'en'));
    expect(ms('1 haora - 4 haora')).toBe(ms('-3h', 'en'));

    expect(ms('7 ra / 7')).toBe(ms('1d', 'en'));
    expect(ms('365 ra / 365')).toBe(ms('1d', 'en'));

    expect(ms('24 haora * 7')).toBe(ms('7d', 'en'));
    expect(ms('1000 nano hēkona * 1000')).toBe(ms('1ms', 'en'));
});
