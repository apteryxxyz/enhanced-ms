// import functions and variables from other files
const number = require('./number'),
    string = require('./string'),
    { parse, pluralize, measurements } = require('./helper');

/**
 * Easily convert milliseconds to a readable time frame OR convert a written time frame into milliseconds.
 * @param {string|number} value Either a written time frame or a time frame in milliseconds.
 * @param {object} options Options to customize what is outputed.
 */
module.exports = function (value, options) {
    // check if value is a number
    if (typeof value === 'number') {
        // if number is 'Infinity'
        if (!Number.isFinite(value)) throw new TypeError('Number has be finite');

        // run the number function with the value and options as the parameters
        else return number(value, options);
    }

    // check if value is a string, if so run the string function with the value as the parameter
    // no options for the string function
    else if (typeof value === 'string') return string(value);

    // if value is not a string or number, throw an error
    else throw new TypeError('Expected a number or a string, got ' + typeof value);

}

// assign parse, pluralize and measurements to exports
Object.assign(module.exports, { parse, pluralize, measurements });