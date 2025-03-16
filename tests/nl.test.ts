import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'nl' });

describe('Dutch (Nederlands)', () => {
  describe('format milliseconds', () => {
    it('formats with default options', () => {
      // 90061 ms should format as "1 minuut 30 seconden" in Dutch.
      expect(ms(90061)).toBe('1 minuut 30 seconden');
      // 90061000 ms should format as "1 dag 1 uur 1 minuut 1 seconde" in Dutch.
      expect(ms(90061000)).toBe('1 dag 1 uur 1 minuut 1 seconde');
    });

    it('returns null for durations below one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('formats with preset short', () => {
      // Expected short format: "min" for minuut, "s" for seconde, "d" for dag, "h" for uur.
      expect(ms(90061, 'short')).toBe('1min 30s');
      expect(ms(90061000, 'short')).toBe('1d 1h');
    });

    it('formats with colon notation preset', () => {
      expect(ms(90061, 'colonNotation')).toBe('01:30');
      expect(ms(90061000, 'colonNotation')).toBe('25:01:01');
    });

    it('formats with use abbreviations', () => {
      const options = { useAbbreviations: true };
      expect(ms(90061, options)).toBe('1min 30s');
      expect(ms(90061000, options)).toBe('1d 1h 1min 1s');
    });

    it('formats with a unit limit', () => {
      const options = { unitLimit: 1 };
      expect(ms(90061, options)).toBe('1 minuut');
      expect(ms(90061000, options)).toBe('1 dag');
    });
  });

  describe('parse duration', () => {
    it('parses durations correctly', () => {
      expect(ms('1 minuut 30 seconden')).toBe(90000);
      expect(ms('1min 30s')).toBe(90000);
      expect(ms('1 minuut 30 seconden 61 milliseconden')).toBe(90061);
      expect(ms('1min 30s 61ms')).toBe(90061);
    });

    it('returns zero for invalid duration strings', () => {
      expect(ms('nyr9341')).toBe(0);
      expect(ms('o4utrc89nyt')).toBe(0);
    });
  });
});
