const ms = require('../dist')('mi');
// const ms = require('enhanced-ms')('mi');

test('convert from string to number', () => {
    // Single unit
    expect(ms('2 hēkona')).toBe(2000);

    // Multiple units
    expect(ms('2 meneti me te 30 hēkona')).toBe(150000);

    // Floats
    expect(ms('1.5 ra')).toBe(129600000);
    expect(ms('1.5 ra me te 1.5 hāora')).toBe(135000000);

    // Experssions
    expect(ms('2 hāora - 30 meneti')).toBe(5400000);
    expect(ms('1 rangi * 365')).toBe(31536000000);
    expect(ms('1 wiki / 2')).toBe(302400000);

    // Experssions with floats
    expect(ms('1.5 ra + 1.5 hāora')).toBe(135000000);
    expect(ms('1.5 ra me te 1.5 hāora')).toBe(135000000);

    // Expersions with multipation and brackets
    expect(ms('1 wiki - 3 ra * 2')).toBe(86400000);
    expect(ms('(1 wiki - 3 ra) * 2')).toBe(691200000);
});

test('convert from number to string', () => {
    // Basic conversions
    expect(ms(1234)).toBe('1 hēkona');
    expect(ms(60123)).toBe('1 meneti');
    expect(ms(3600000)).toBe('1 hāora');
    expect(ms(86400000)).toBe('1 rā');
    expect(ms(172800000)).toBe('2 rā');

    // Complex conversions
    expect(ms(90061000)).toBe('1 rā 1 hāora 1 meneti me te 1 hēkona');
    expect(ms(123456789)).toBe('1 rā 10 hāora 17 meneti me te 36 hēkona');
    expect(ms(91000)).toBe('1 meneti me te 31 hēkona');
    
    // With 'includeMs' option
    expect(ms(123)).toBe(null);
    expect(ms(123, { includeMs: true })).toBe('123 hēkona miri');

    // With 'includeSubMs' option
    expect(ms(123, { includeSubMs: true })).toBe('123 hēkona miri');
    expect(ms(123.456, { includeSubMs: true })).toBe('123 hēkona miri me te 456 hēkona miriona');
    expect(ms(123.456789, { includeSubMs: true })).toBe('123 hēkona miri 456 hēkona miriona me te 789 hēkona nanomiri');

    // With 'shortFormat' option
    // Language does not support short format

    // With 'roundUp' option
    expect(ms(1000.1111, { roundUp: true })).toBe('2 hēkona');
    expect(ms(605348179, { roundUp: true })).toBe('8 rā');
    expect(ms(111111111111111, { roundUp: true })).toBe('3,524 tau');

    // With 'roundUp' and 'shortFormat' options
    // Language does not support short format
});
