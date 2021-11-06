const { isNumber, parse, pluralize, units } = require('./utils');

function stringify(number, options) {
    if (!isNumber(number)) throw new TypeError(`Exepected a number, received a ${typeof number}`);

    const parsedTime = parse(number, options.includeMs, options.includeSubMs);
    if (options.returnParsed === true) return parsedTime;
    const timeEntries = Object.entries(parsedTime).filter(x => x[1] !== 0);

    let final = [];
    for (let i = 0, f = 0, u = 0; i < timeEntries.length; i++) {
        const entry = timeEntries[i],
            amount = entry[1];
        let unit = units.find(n => n.plural === entry[0]);

        const long = options.verbose === true || false;
        if (options.compact === true) {
            if (i === 0) {
                f = amount;
                u = unit;
            } else if (i === 1) {
                if (amount * unit.ms > u.ms / 2) f += 1;
                final = [f + (long === true ? ` ${u.long}` : u.short)];
                break;
            }
        }

        unit = long ? unit.long : unit.short;
        if (amount === 1 || amount === -1) {
            final.push(`1${long ? ' ' : ''}${unit}`);
        } else if (amount > 1 || amount < -1) {
            final.push(`${Math.abs(amount)}${long ? ' ' : ''}${pluralize(unit, amount)}`);
        }
    }

    if (final.length < 1) return null;
    final = final.map(x => (x.indexOf('us') !== -1 && options.useMu === true ? x.replace(/us/g, '\u03BCs') : x));
    if (final.length === 1 || options.compact === true) return final[0];
    if (options.includeAnd === true && final.length > 1) {
        var lastItem = final.pop();
        final.push('and');
        final.push(lastItem);
    }

    return (number < 0 ? '-' : '') + final.join(' ');
}

module.exports = stringify;
