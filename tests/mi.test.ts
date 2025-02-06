import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'mi' });

describe('Māori', () => {
  describe('format milliseconds', () => {
    it('formats milliseconds with default options', () => {
      expect(ms(90061)).toBe('1 meneti 30 hēkona');
      expect(ms(90061000)).toBe('1 rā 1 hāora 1 meneti 1 hēkona');
    });

    it('returns null for sub one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('format using colon notation preset', () => {
      expect(ms(90061, 'colonNotation')).toBe('01:30');
      expect(ms(90061000, 'colonNotation')).toBe('25:01:01');
    });

    it('formats with unit limit', () => {
      const options = { unitLimit: 1 };
      expect(ms(90061, options)).toBe('1 meneti');
      expect(ms(90061000, options)).toBe('1 rā');
    });
  });

  describe('parse duration', () => {
    it('parses durations', () => {
      expect(ms('1 meneti 30 hēkona')).toBe(90000);
      expect(ms('1 meneti 30 hēkona 61 hēkona miri')).toBe(90061);
    });

    it('returns zero for invalid durations', () => {
      expect(ms('nyr9341')).toBe(0);
      expect(ms('o4utrc89nyt')).toBe(0);
    });
  });
});
