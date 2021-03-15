// time measurements
const MEASUREMENTS = {
    // used in both functions
    millisecond: { long: 'millisecond', plural: 'milliseconds', short: 'ms', ms: 1 },
    second: { long: 'second', plural: 'seconds', short: 's', ms: 1000 },
    minute: { long: 'minute', plural: 'minutes', short: 'm', ms: 60000 },
    hour: { long: 'hour', plural: 'hours', short: 'h', ms: 3600000 },
    day: { long: 'day', plural: 'days', short: 'd', ms: 86400000 },
    year: { long: 'year', plural: 'years', short: 'y', ms: 31536000000 },

    // used in the string function only
    millennium: { long: 'millennium', plural: 'millenniums', short: 'kyr', ms: 31536000000000 },
    century: { long: 'century', plural: 'centuries', short: 'c', ms: 3153600000000 },
    decade: { long: 'decade', plural: 'decades', short: 'dec', ms: 315360000000 },

    // inaccurate measurements
    // months not always 30 days, and 4 weeks not always in a month
    week: { long: 'week', plural: 'weeks', short: 'w', ms: 604800000 },
    month: { long: 'month', plural: 'month', short: 'mo', ms: 2592000000 }
}

// convert milliseconds into an object containing years, hours, minutes, seconds and milliseconds
const parse = function (ms) {
    // if ms is a postive number is Math.floor else use Math.ceil
    const round = ms > 0 ? Math.floor : Math.ceil;

    // divid ms by each measurements ms value
    return {
        years: round(ms / MEASUREMENTS.year.ms),
        days: round(ms / MEASUREMENTS.day.ms) % 365,
        hours: round(ms / MEASUREMENTS.hour.ms) % 24,
        minutes: round(ms / MEASUREMENTS.minute.ms) % 60,
        seconds: round(ms / MEASUREMENTS.second.ms) % 60,
        milliseconds: round(ms / MEASUREMENTS.millisecond.ms) % 1000
    }
}

// pluralize time measurements
const pluralize = function (word, count) {
    // find the word in the constant measurements
    let measurement = Object.values(MEASUREMENTS).find(m => m.long === word || m.short === word || m.plural === word);

    // if word is short then return measurement.short as shorts have no plurals
    if (measurement && word && word.length <= 2) return measurement.short;

    // if count is one then no need for plural
    else if (measurement && count === 1) return measurement.long;

    // if count is greater than one use plural
    else if (measurement && count > 1) return measurement.plural;

    // else if count is greater than  1 return the original input with an s
    else if (count > 1) return word + 's';
    
    // else return the original input
    else return word;
    
}

// export functions to use outside this file
module.exports = { parse, pluralize, measurements: Object.values(MEASUREMENTS) };