import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'ru' });

describe('Russian', () => {
  describe('format milliseconds', () => {
    it('formats milliseconds with default options', () => {
      expect(ms(90061)).toBe('1 минута 30 секунд');
      expect(ms(90061000)).toBe('1 день 1 час 1 минута 1 секунда');
    });

    it('returns null for sub one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('format using short preset', () => {
      expect(ms(90061, 'short')).toBe('1м 30с');
      expect(ms(90061000, 'short')).toBe('1д 1ч');
    });

    it('format using colon notation preset', () => {
      expect(ms(90061, 'colonNotation')).toBe('01:30');
      expect(ms(90061000, 'colonNotation')).toBe('25:01:01');
    });

    it('formats with use abbreviations', () => {
      const options = { useAbbreviations: true };
      expect(ms(90061, options)).toBe('1м 30с');
      expect(ms(90061000, options)).toBe('1д 1ч 1м 1с');
    });

    it('formats with unit limit', () => {
      const options = { unitLimit: 1 };
      expect(ms(90061, options)).toBe('1 минута');
      expect(ms(90061000, options)).toBe('1 день');
    });
  });

  describe('parse duration', () => {
    it('parses durations', () => {
      expect(ms('1 минута 30 секунд')).toBe(90000);
      expect(ms('1м 30с')).toBe(90000);
      expect(ms('1 минута 30 секунд 61 миллисекунда')).toBe(90061);
      expect(ms('1м 30с 61мс')).toBe(90061);
    });

    it('returns zero for invalid durations', () => {
      expect(ms('nyr9341')).toBe(0);
      expect(ms('o4utrc89nyt')).toBe(0);
    });
  });
});
