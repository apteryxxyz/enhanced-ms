/* eslint-disable no-undef */
import { ms, parse } from '..';

describe('ms(number)', () => {
  describe('ms(2000)', () => {
    it('should return the written form of 2000 milliseconds', () => {
      expect(ms(2000)).toBe('2s');
    });
  });

  describe('ms(93784005)', () => {
    it('should return the written form of 93784005 milliseconds', () => {
      expect(ms(93784005, { ms: true })).toBe('1d 2h 3m 4s 5ms');
    });
  });

  describe('ms(3600000, { long: true })', () => {
    it('should return the long written form of 3600000 milliseconds', () => {
      expect(ms(3600000, { long: true })).toBe('1 hour');
    });
  });

  describe('ms(43200000, { raw: true })', () => {
    it('should return the raw parsed milliseconds object', () => {
      expect(ms(43200000, { raw: true })).toEqual(parse(43200000));
    });
  });
});

describe('ms(string)', () => {
  describe("ms('2s')", () => {
    it('should return 2 seconds in milliseconds', () => {
      expect(ms('2s')).toBe(2000);
    });
  });

  describe("ms('10 hours 46 minutes 5 seconds')", () => {
    it('should return 10 houts 46 minutes and 5 seconds in milliseconds', () => {
      expect(ms('10 hours 46 minutes 5 seconds')).toBe(38765000);
    });
  });
});
