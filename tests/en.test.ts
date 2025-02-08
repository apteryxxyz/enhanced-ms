import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'en' });

describe('English', () => {
  describe('format milliseconds', () => {
    it('formats milliseconds with default options', () => {
      expect(ms(90061)).toBe('1 minute 30 seconds');
      expect(ms(90061000)).toBe('1 day 1 hour 1 minute 1 second');
    });

    it('returns null for sub one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('format using short preset', () => {
      expect(ms(90061, 'short')).toBe('1m 30s');
      expect(ms(90061000, 'short')).toBe('1d 1h');
    });

    it('format using colon notation preset', () => {
      expect(ms(90061, 'colonNotation')).toBe('01:30');
      expect(ms(90061000, 'colonNotation')).toBe('25:01:01');
    });

    it('formats with use abbreviations', () => {
      const options = { useAbbreviations: true };
      expect(ms(90061, options)).toBe('1m 30s');
      expect(ms(90061000, options)).toBe('1d 1h 1m 1s');
    });

    it('formats with unit limit', () => {
      const options = { unitLimit: 1 };
      expect(ms(90061, options)).toBe('1 minute');
      expect(ms(90061000, options)).toBe('1 day');
    });
  });

  describe('parse duration', () => {
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
