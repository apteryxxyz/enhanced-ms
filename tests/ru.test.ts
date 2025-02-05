import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'ru' });

describe('Russian', () => {
  describe('ms(milliseconds: number)', () => {
    it('format milliseconds with default options', () => {
      expect(ms(90061)).toBe('1 минута 30 секунд');
    });

    it('returns null for sub one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('formats with abbreviated units', () => {
      const options = { abbreviateUnits: true };
      expect(ms(90061, options)).toBe('1м 30с');
    });

    it('includes milliseconds and sub-milliseconds', () => {
      const options = { includeMs: true, includeSubMs: true };
      expect(ms(90061, options)).toBe('1 минута 30 секунд 61 миллисекунда');
    });

    it('formats with commas and "and" insertions', () => {
      const options = { insertCommas: true, insertAnd: true };
      expect(ms(90061, options)).toBe('1 минута, и 30 секунд');
    });

    describe('ms(duration: string)', () => {
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
});
