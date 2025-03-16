import { createMs } from 'enhanced-ms';
import { describe, expect, it } from 'vitest';

// Using German locale (de)
const ms = createMs({ language: 'de' });

describe('German (Deutsch)', () => {
  describe('format milliseconds', () => {
    it('formats with default options', () => {
      // 90061 ms should format as "1 Minute 30 Sekunden"
      expect(ms(90061)).toBe('1 Minute 30 Sekunden');
      // 90061000 ms should format as "1 Tag 1 Stunde 1 Minute 1 Sekunde"
      expect(ms(90061000)).toBe('1 Tag 1 Stunde 1 Minute 1 Sekunde');
    });

    it('returns null for durations below one second with default options', () => {
      expect(ms(0)).toBeNull();
    });

    it('formats with preset short', () => {
      // Expected abbreviations based on the German config:
      // Minute -> "Min.", Sekunde -> "Sek.", Tag -> "T.", Stunde -> "Std."
      expect(ms(90061, 'short')).toBe('1Min. 30Sek.');
      expect(ms(90061000, 'short')).toBe('1T. 1Std.');
    });

    it('formats with colon notation preset', () => {
      expect(ms(90061, 'colonNotation')).toBe('01:30');
      expect(ms(90061000, 'colonNotation')).toBe('25:01:01');
    });

    it('formats with use abbreviations', () => {
      const options = { useAbbreviations: true };
      expect(ms(90061, options)).toBe('1Min. 30Sek.');
      expect(ms(90061000, options)).toBe('1T. 1Std. 1Min. 1Sek.');
    });

    it('formats with a unit limit', () => {
      const options = { unitLimit: 1 };
      expect(ms(90061, options)).toBe('1 Minute');
      expect(ms(90061000, options)).toBe('1 Tag');
    });
  });

  describe('parse duration', () => {
    it('parses durations correctly', () => {
      expect(ms('1 Minute 30 Sekunden')).toBe(90000);
      expect(ms('1Min. 30Sek.')).toBe(90000);
      expect(ms('1 Minute 30 Sekunden 61 Millisekunden')).toBe(90061);
      expect(ms('1Min. 30Sek. 61ms')).toBe(90061);
    });

    it('returns zero for invalid duration strings', () => {
      expect(ms('nyr9341')).toBe(0);
      expect(ms('o4utrc89nyt')).toBe(0);
    });
  });
});
