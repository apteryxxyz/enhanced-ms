import { Maybe, Options, Raw } from './types';

// import functions and variables from helper file
import { parse, pluralize, measurements } from './helper';

export function numberHandler(
  milliseconds: number,
  options?: Options & { raw?: true }
): Maybe<Raw>;
export function numberHandler(
  milliseconds: number,
  options?: Options
): Maybe<string>;
export function numberHandler(
  milliseconds: number,
  options: Options = { long: false, and: false, raw: false, ms: false }
): Maybe<string | Raw> {
  // if milliseconds is greater than limit
  if (milliseconds > 999999999999999999999999999999) return null;

  // parse the milliseconds
  const timeObject = parse(milliseconds);

  // return the parsed milliseconds if raw option is true
  if (options.raw === true) return timeObject;

  // turn the parsed milliseconds into an array to loop through
  const timeEntries = Object.entries(timeObject);

  // define final, an array to store the outputted strings
  const final: string[] = [];

  // loop though each time entry
  for (let i = 0; i < timeEntries.length; i++) {
    // give own variables to entry items
    const measurement = measurements.find(
      (m) => m.plural === timeEntries[i][0]
    );
    const amount = Math.abs(timeEntries[i][1]);

    // whether or not to use short time measurements
    const short = !options.long || false;
    const unit = short ? measurement?.short ?? '' : measurement?.long ?? '';

    // if options ms is false, skip adding milliseconds
    if (!['ms', 'milliseconds'].includes(unit) || options.ms) {
      // if amount is single (1 or -1) use no plural
      if (amount === 1 || amount === -1) {
        final.push(`1${short ? '' : ' '}${unit}`);
      }
      // if amount is not 1 or -1 use plural
      else if (amount > 1 || amount < -1) {
        final.push(amount + (short ? '' : ' ') + pluralize(unit, amount));
      }
    }
  }

  // if and option is true and final length is greater than 1, add 'and' to the array
  if (options.and === true && final.length > 1) {
    // get and remove (pop) the last item
    const lastItem = final.pop();

    // add 'and' to the array
    final.push('and');

    // re-add the last item
    // array is now like [..., 'and', lastItem]
    if (lastItem) final.push(lastItem);
  }

  // if final array is empty, return null
  if (!final.length) return null;

  // return the result
  return final.map((x) => (milliseconds < 0 ? '-' : '') + x).join(' ');
}
