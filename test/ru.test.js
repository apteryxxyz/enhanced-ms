const ms = require('../dist')('ru');
// const ms = require('enhanced-ms')('en');

test('convert from string to number', () => {
  // Single unit
  expect(ms('2с')).toBe(2000);
  expect(ms('2 секунды')).toBe(2000);

  // Multiple units
  expect(ms('2м 30с')).toBe(150000);
  expect(ms('2 минуты и 30 секунд')).toBe(150000);

  // Floats
  expect(ms('1.5 дня')).toBe(129600000);
  expect(ms('1.5 дня и 1.5 часа')).toBe(135000000);

  // Expressions
  expect(ms('2 часа - 30 минут')).toBe(5400000);
  expect(ms('1 день * 365')).toBe(31536000000);
  expect(ms('1 неделя / 2')).toBe(302400000);

  // Expressions with floats
  expect(ms('1.5 дня + 1.5 часа')).toBe(135000000);
  expect(ms('1.5 дня и 1.5 часа')).toBe(135000000);

  // Expressions with mutilation and brackets
  expect(ms('1 неделя - 3 дня * 2')).toBe(86400000);
  expect(ms('(1 неделя - 3 дня) * 2')).toBe(691200000);
});

test('convert from number to string', () => {
  // Basic conversions
  expect(ms(1234)).toBe('1 секунда');
  expect(ms(60123)).toBe('1 минута');
  expect(ms(3600000)).toBe('1 час');
  expect(ms(86400000)).toBe('1 день');
  expect(ms(172800000)).toBe('2 дня');

  // Complex conversions
  expect(ms(90061000)).toBe('1 день 1 час 1 минута и 1 секунда');
  expect(ms(123456789)).toBe('1 день 10 часов 17 минут и 36 секунд');
  expect(ms(91000)).toBe('1 минута и 31 секунда');

  // With 'includeMs' option
  expect(ms(123)).toBe(null);
  expect(ms(123, { includeMs: true })).toBe('123 миллисекунды');

  // With 'includeSubMs' option
  expect(ms(123, { includeSubMs: true })).toBe('123 миллисекунды');
  expect(ms(123.456, { includeSubMs: true })).toBe(
    '123 миллисекунды и 456 микросекунд',
  );
  expect(ms(123.456789, { includeSubMs: true })).toBe(
    '123 миллисекунды 456 микросекунд и 789 наносекунд',
  );

  // With 'shortFormat' option
  expect(ms(123456789, { shortFormat: true })).toBe('1д 10ч 17м 36с');
  expect(ms(4354565, { shortFormat: true })).toBe('1ч 12м 34с');
  expect(ms(111111111111111, { shortFormat: true })).toBe(
    '3,523г 113д 5ч 31м 51с',
  );

  // With 'roundUp' option
  expect(ms(1000.1111, { roundUp: true })).toBe('2 секунды');
  expect(ms(605348179, { roundUp: true })).toBe('8 дней');
  expect(ms(111111111111111, { roundUp: true })).toBe('3,524 года');

  // With 'roundUp' and 'shortFormat' options
  expect(ms(111111111111111, { roundUp: true, shortFormat: true })).toBe(
    '3,524г',
  );
  expect(ms(334593485, { roundUp: true, shortFormat: true })).toBe('4д');
});
