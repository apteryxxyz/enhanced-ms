import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

const ms = createMs({ language: 'fr' });

describe('French (Français)', () => {
  describe('format milliseconds', () => {
    it('formats with default options', () => {
      // 90061 ms should format as "1 minute 30 secondes" in French
      expect(ms(90061)).toBe('1 minute 30 secondes');
      // 90061000 ms should format as "1 jour 1 heure 1 minute 1 seconde" in French
      expect(ms(90061000)).toBe('1 jour 1 heure 1 minute 1 seconde');
    });

    it('returns null for durations below one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('formats with preset short', () => {
      // Expected short format using abbreviations: "min" for minute, "s" for seconde, "j" for jour, "h" for heure.
      expect(ms(90061, 'short')).toBe('1min 30s');
      expect(ms(90061000, 'short')).toBe('1j 1h');
    });

    it('formats with colon notation preset', () => {
      expect(ms(90061, 'colonNotation')).toBe('01:30');
      expect(ms(90061000, 'colonNotation')).toBe('25:01:01');
    });

    it('formats with use abbreviations', () => {
      const options = { useAbbreviations: true };
      expect(ms(90061, options)).toBe('1min 30s');
      expect(ms(90061000, options)).toBe('1j 1h 1min 1s');
    });

    it('formats with a unit limit', () => {
      const options = { unitLimit: 1 };
      expect(ms(90061, options)).toBe('1 minute');
      expect(ms(90061000, options)).toBe('1 jour');
    });
  });

  describe('parse duration', () => {
    it('parses durations correctly', () => {
      expect(ms('1 minute 30 secondes')).toBe(90000);
      expect(ms('1min 30s')).toBe(90000);
      expect(ms('1 minute 30 secondes 61 millisecondes')).toBe(90061);
      expect(ms('1min 30s 61ms')).toBe(90061);
    });

    it('returns zero for invalid duration strings', () => {
      expect(ms('nyr9341')).toBe(0);
      expect(ms('o4utrc89nyt')).toBe(0);
    });
  });
});
