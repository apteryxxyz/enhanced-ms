const ms = require('../dist')('en');
// const ms = require('enhanced-ms')('en');

test('convert from string to number', () => {
    // Single unit
    expect(ms('2s')).toBe(2000);
    expect(ms('2 seconds')).toBe(2000);

    // Multiple units
    expect(ms('2m 30s')).toBe(150000);
    expect(ms('2 minutes and 30 seconds')).toBe(150000);

    // Floats
    expect(ms('1.5 days')).toBe(129600000);
    expect(ms('1.5 days and 1.5 hours')).toBe(135000000);

    // Experssions
    expect(ms('2 hours - 30 minutes')).toBe(5400000);
    expect(ms('1 day * 365')).toBe(31536000000);
    expect(ms('1 week / 2')).toBe(302400000);

    // Experssions with floats
    expect(ms('1.5 days + 1.5 hours')).toBe(135000000);
    expect(ms('1.5 days and 1.5 hours')).toBe(135000000);

    // Expersions with multipation and brackets
    expect(ms('1 week - 3 days * 2')).toBe(86400000);
    expect(ms('(1 week - 3 days) * 2')).toBe(691200000);
});

test('convert from number to string', () => {
    // Basic conversions
    expect(ms(1234)).toBe('1 second');
    expect(ms(60123)).toBe('1 minute');
    expect(ms(3600000)).toBe('1 hour');
    expect(ms(86400000)).toBe('1 day');
    expect(ms(172800000)).toBe('2 days');

    // Complex conversions
    expect(ms(90061000)).toBe('1 day 1 hour 1 minute and 1 second');
    expect(ms(123456789)).toBe('1 day 10 hours 17 minutes and 36 seconds');
    expect(ms(91000)).toBe('1 minute and 31 seconds');
    
    // With 'includeMs' option
    expect(ms(123)).toBe(null);
    expect(ms(123, { includeMs: true })).toBe('123 milliseconds');

    // With 'includeSubMs' option
    expect(ms(123, { includeSubMs: true })).toBe('123 milliseconds');
    expect(ms(123.456, { includeSubMs: true })).toBe('123 milliseconds and 456 microseconds');
    expect(ms(123.456789, { includeSubMs: true })).toBe('123 milliseconds 456 microseconds and 789 nanoseconds');

    // With 'shortFormat' option
    expect(ms(123456789, { shortFormat: true })).toBe('1d 10h 17m 36s');
    expect(ms(4354565, { shortFormat: true })).toBe('1h 12m 34s');
    expect(ms(111111111111111, { shortFormat: true })).toBe('3,523y 113d 5h 31m 51s');

    // With 'roundUp' option
    expect(ms(1000.1111, { roundUp: true })).toBe('2 seconds');
    expect(ms(605348179, { roundUp: true })).toBe('8 days');
    expect(ms(111111111111111, { roundUp: true })).toBe('3,524 years');

    // With 'roundUp' and 'shortFormat' options
    expect(ms(111111111111111, { roundUp: true, shortFormat: true })).toBe('3,524y');
    expect(ms(334593485, { roundUp: true, shortFormat: true })).toBe('4d');
});
