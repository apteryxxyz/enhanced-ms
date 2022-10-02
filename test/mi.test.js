const ms = require('../dist')('mi');
// const ms = require('enhanced-ms')('en');

test('convert from string to number', () => {
    expect(ms('1 meneti')).toBe(60000);

    expect(ms('3 haora')).toBe(3 * 3.6e6);

    expect(ms('4 haora + 60 meneti')).toBe(5 * 3.6e6);

    expect(ms('1 rā + 1 ra + 5 rā - wiki')).toBe(0);
});

test('convert from number to string', () => {
    expect(ms(123456789)).toBe('1 rā 10 haora 17 meneti me te 36 hēkona');

    expect(ms(91000, { roundUp: true })).toBe('2 meneti');

    expect(ms(1111.111111, { includeSubMs: true })).toBe(
        '1 hēkona 111 manomano hēkona 111 moroiti hēkona me te 111 nano hēkona'
    );
});
