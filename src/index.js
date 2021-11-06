const stringify = require('./stringify');
const numberify = require('./numberify');
const _ = require('./utils');

function ms(value, options) {
    if (_.isObject(value)) {
        ms.defaultOptions = _.formatOptions(value, ms.defaultOptions);
        return ms;
    }

    if (_.isObject(options)) options = _.formatOptions(options, ms.defaultOptions);
    else options = _.formatOptions(null, ms.defaultOptions);

    if (_.isNumber(value)) return stringify(value, options);
    if (_.isString(value)) return numberify(value, options);

    throw new TypeError(`Expected a number or a string, received a ${typeof value}`);
}

const addons = {
    version: require('../package.json').version,
    isNode:
        typeof process !== 'undefined' &&
        typeof process.versions !== 'undefined' &&
        typeof process.versions.node !== 'undefined',
    isBrowser: typeof windows !== 'undefined' && typeof document !== 'undefined',
};

const methods = {
    units: _.units,
    stringify,
    numberify,
    parse: _.parse,
    pluralize: _.pluralize,
    isObject: _.isObject,
    isNumber: _.isNumber,
    isString: _.isString,
};

module.exports = Object.assign(ms, addons, methods);
