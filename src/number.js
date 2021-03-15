// import functions and variables from helper file
const { parse, pluralize, measurements } = require('./helper');

// export function
module.exports = function (milliseconds, options = { long: false, and: false, raw: false }) {
    // if milliseconds is greater than limit
    if (milliseconds > 999999999999999999999999999999) return null;

    // parse the milliseconds
    const timeObject = parse(milliseconds);

    // return the parsed milliseconds if raw option is true
    if (options.raw === true) return timeObject

    // turn the parsed milliseconds into an array to loop though
    const timeEntries = Object.entries(timeObject);
    
    // define final, an array to store the outputted strings
    const final = [];

    // loop though each time entry
    for (let i = 0; i < timeEntries.length; i++) {
        // give own variables to entry items
        let measurement = measurements.find(m => m.plural === timeEntries[i][0]);
        const amount = timeEntries[i][1];

        // whether or not to use short time measurements
        const short = !options.long || false;
        measurement = short ? measurement.short : measurement.long;

        // if amount is single (1 or -1) use no plural
        if (amount === 1 || amount === -1) final.push('1' + (short ? '' : ' ') + measurement);

        // if amount is not 1 or -1 use plural
        else if (amount > 1 || amount < -1) final.push(amount + (short ? '' : ' ') + pluralize(measurement, amount));

        // else skip this loop
        else continue;
    }

    // if and option is true and final length is greater than 1, add 'and' to the array
    if (options.and === true && final.length > 1) {
        // get and remove (pop) the last item
        let lastItem = final.pop();

        // add 'and' to the array
        final.push('and');

        // re-add the last item
        // array is now like [..., 'and', lastItem]
        final.push(lastItem);
    }

    // return the result
    return (milliseconds < 0 ? '-' : '') + final.join(' ');
}