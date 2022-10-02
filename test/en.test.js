const ms = require('../dist')('en');
// const ms = require('enhanced-ms')('en');

test('convert from string to number', () => {
    expect(ms('1m')).toBe(60000);

    expect(ms('3 hours')).toBe(3 * 3.6e6);

    expect(ms('4 hours + 60m')).toBe(5 * 3.6e6);

    expect(ms('1d + 1 day + 5 days - week')).toBe(0);
});

test('convert from number to string', () => {
    expect(ms(123456789)).toBe('1 day 10 hours 17 minutes and 36 seconds');

    expect(ms(123456789, { shortFormat: true })).toBe('1d 10h 17m 36s');

    expect(ms(91000, { roundUp: true })).toBe('2 minutes');

    expect(ms(1111.111111, { includeSubMs: true })).toBe(
        '1 second 111 milliseconds 111 microseconds and 111 nanoseconds'
    );
});
