import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'de' });

describe('German', () => {
  describe('ms(milliseconds: number)', () => {
    it('format milliseconds with default options', () => {
      expect(ms(90061)).toBe('1 Minute 30 Sekunden');
    });

    it('returns null for sub one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('includes milliseconds and sub-milliseconds', () => {
      const options = { includeMs: true, includeSubMs: true };
      expect(ms(90061, options)).toBe('1 Minute 30 Sekunden 61 Millisekunden');
    });

    it('formats with commas and "and" insertions', () => {
      const options = { insertCommas: true, insertAnd: true };
      expect(ms(90061, options)).toBe('1 Minute, und 30 Sekunden');
    });
  });

  describe('ms(duration: string)', () => {
    it('parses durations', () => {
      expect(ms('1 Minute 30 Sekunden')).toBe(90000);
      expect(ms('1 Minute 30 Sekunden 61 Millisekunden')).toBe(90061);
    });

    it('returns zero for invalid durations', () => {
      expect(ms('nyr9341')).toBe(0);
      expect(ms('o4utrc89nyt')).toBe(0);
    });
  });
});
