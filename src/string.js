// import functions and variables from helper file
const { measurements } = require('./helper');

// export function
module.exports = function (string) {
    //match string for any type of time measurement
    const matched = string.match(/(-?(?:\d+)?\.?\d+) *(millenniums?|kyr|century|centuries|c|decades?|dec|milliseconds?|ms|microseconds?|us|nanoseconds?|ns|years?|y|months?|mo|weeks?|w|days?|d|hours?|h|minutes?|m|seconds?|s)?/gi);
    
    // if no matched return null
    if (!matched) return null;

    // define a variable the total number of milliseconds
    // gets added to each loop
    let total = 0;

    // loop though each time measurement found in the string
    for (let i = 0; i < matched.length; i++) {
        // remove everything that isnt a letter to get the measurement name
        let measurement = matched[i].replace(/[^A-Z]+/gi, '');

        // remove everything that isn't a number, . or -
        const amount = matched[i].replace(/[^0-9.\-]/gi, '');

        // find the measurement object in measurements array
        measurement = measurements.find(m => m.long === measurement || m.short === measurement || m.plural === measurement);
        
        // if no measurement skip and continue loop
        if (!measurement) continue;

        // add measurements ms amount to total
        total += amount * measurement.ms;
    }

    // return number of milliseconds
    return total;
}