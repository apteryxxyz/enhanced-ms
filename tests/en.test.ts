import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'en' });

describe('English', () => {
  describe('ms(milliseconds: number)', () => {
    it('format milliseconds with default options', () => {
      expect(ms(90061)).toBe('1 minute 30 seconds');
    });

    it('returns null for sub one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('formats with abbreviated units', () => {
      const options = { abbreviateUnits: true };
      expect(ms(90061, options)).toBe('1m 30s');
    });

    it('includes milliseconds and sub-milliseconds', () => {
      const options = { includeMs: true, includeSubMs: true };
      expect(ms(90061, options)).toBe('1 minute 30 seconds 61 milliseconds');
    });

    it('formats with commas and "and" insertions', () => {
      const options = { insertCommas: true, insertAnd: true };
      expect(ms(90061, options)).toBe('1 minute, and 30 seconds');
    });
  });

  describe('ms(duration: string)', () => {
    it('parses durations', () => {
      expect(ms('1 minute 30 seconds')).toBe(90000);
      expect(ms('1m 30s')).toBe(90000);
      expect(ms('1 minute 30 seconds 61 milliseconds')).toBe(90061);
      expect(ms('1m 30s 61ms')).toBe(90061);
    });

    it('returns zero for invalid durations', () => {
      expect(ms('nyr9341')).toBe(0);
      expect(ms('o4utrc89nyt')).toBe(0);
    });
  });
});
