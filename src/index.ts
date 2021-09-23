// import functions and variables from other files
import { numberHandler } from './number';
import { stringHandler } from './string';
import { parse, pluralize, measurements } from './helper';
import type { Maybe, Options, OptionsNoRaw, OptionsRaw, Raw } from './types';

/**
 * Easily convert milliseconds to a readable time frame OR convert a written time frame into milliseconds.
 */
export function ms(value: number, options?: OptionsNoRaw): Maybe<string>;
export function ms(value: string, options?: OptionsNoRaw): Maybe<number>;
export function ms(value: number | string, options?: OptionsRaw): Maybe<Raw>;
export function ms(
  value: string | number,
  options?: Options
): Maybe<string | number | Raw> {
  // check if value is a number
  if (typeof value === 'number') {
    // if number is 'Infinity'
    if (!Number.isFinite(value)) {
      throw new TypeError('Number has be finite');
    }
    // run the number function with the value and options as the parameters
    else return numberHandler(value, options);
  }

  // check if value is a string, if so run the string function with the value as the parameter
  // no options for the string function
  else if (typeof value === 'string') return stringHandler(value);
  // if value is not a string or number, throw an error
  else {
    throw new TypeError(`Expected a number or a string, got ${typeof value}`);
  }
}

// assign parse, pluralize and measurements to exports
export { parse, pluralize, measurements };
