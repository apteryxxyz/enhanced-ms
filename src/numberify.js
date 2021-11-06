const { isString, units } = require('./utils');

function numberify(string) {
    if (!isString(string)) throw new TypeError(`Expected a number, received a ${typeof string}`);

    const matched = string.match(
        new RegExp(
            '(-?(?:\\d+)?\\.?\\d+) *' +
                '(millenniums?|kyr' +
                '|c(entur(y|ies))?' +
                '|dec(ades?)?' +
                '|ms|milliseconds?' +
                '|(u|\u03BC)s|\\u03BCs|microseconds?' +
                '|ns|nanoseconds?' +
                '|y((ear)?s?)?' +
                '|mo((nth)?s?)?' +
                '|w((eek)?s?)?' +
                '|d((ay)?s?)?' +
                '|h((our)?s?)?' +
                '|m(in(ute)?s?)?' +
                '|s(ec(ond)?s?)?)',
            'gi',
        ),
    );
    if (!matched || matched.length < 1) return 0;

    let total = 0,
        isNegative = false;
    for (let i = 0; i < matched.length; i++) {
        if (i === 0 && matched[i].indexOf('-') === 0) isNegative = true;
        let amount = parseFloat(matched[i].replace(/[^\d.]/g, ''));
        let unit = matched[i].replace(/[^A-Z\u03BC]+/gi, '')?.toLowerCase();
        unit = units.find(u => u.long === unit || u.short === unit || u.plural === unit);
        if (!unit || !amount) continue;
        if (!isNegative && matched[i].indexOf('-') === 0) amount *= -1;
        total += unit.ms * amount;
    }
    return isNegative ? -total : total;
}

module.exports = numberify;
