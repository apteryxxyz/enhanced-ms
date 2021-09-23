// import functions and variables from helper file
import { measurements } from './helper';
import { Maybe } from './types';

// export function
export function stringHandler(string: string): Maybe<number> {
  // match string for any type of time measurement
  const matched = string.match(
    /(-?(?:\d+)?\.?\d+) *(millenniums?|kyr|century|centuries|c|decades?|dec|milliseconds?|ms|microseconds?|us|nanoseconds?|ns|years?|y|months?|mo|weeks?|w|days?|d|hours?|h|minutes?|m|seconds?|s)?/gi
  );

  // if no matched return null
  if (!matched) return null;

  // define a variable the total number of milliseconds
  // gets added to each loop
  let total = 0;

  // loop though each time measurement found in the string
  for (let i = 0; i < matched.length; i++) {
    // remove everything that isnt a letter to get the measurement name
    const match = matched[i].replace(/[^A-Z]+/gi, '');

    // remove everything that isn't a number, . or -
    const amount = matched[i].replace(/[^0-9.-]/gi, '');

    // find the measurement object in measurements array
    const measurement = measurements.find(
      (m) => m.long === match || m.short === match || m.plural === match
    );

    // if no measurement skip and continue loop
    if (measurement) {
      // add measurements ms amount to total
      // @ts-expect-error lol
      total += amount * measurement.ms;
    }
  }

  // return number of milliseconds
  return total;
}
