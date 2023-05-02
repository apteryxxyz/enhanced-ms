import type { LanguageOptions } from './languages';
import { defaultLanguageOptions } from './languages';

// The parse function does not take any options, but this may be used in the future
export interface ParseOptions {}

export const defaultParseOptions: ParseOptions = {};

export function parse(
    input: string,
    _options: ParseOptions = defaultParseOptions,
    language: LanguageOptions = defaultLanguageOptions
) {
    if (input.length < 2) return null;

    const { regex, thousandsSeparator, decimalSeparator, units } = language;

    const foundMatches = input.match(regex);
    if (!foundMatches || foundMatches.length === 0) return null;
    const isNegative = foundMatches[0] === '-';
    if (isNegative) foundMatches.shift();

    const finalCode = [];
    let valueBuffer = '';

    for (let i = 0; i < foundMatches.length; i++) {
        const [previous, current, next] = [
            foundMatches[i - 1],
            foundMatches[i],
            foundMatches[i + 1],
        ];

        if (isOperator(current) || isBracket(current)) {
            finalCode.push(current);
            continue;
        } else if (/[\d ,.]/.test(current)) {
            if (!isOperator(previous)) valueBuffer += '+';

            if (language.units[next]) valueBuffer += '(';

            const hasThousands = current.includes(thousandsSeparator);
            const hasDecimal = current.includes(decimalSeparator);

            // Replace the thousands separator with nothing, and the decimal separator with a dot
            if (hasThousands && hasDecimal) {
                const [thousands, decimal] = current.split(decimalSeparator);
                const thousandsValue = thousands.replaceAll(
                    thousandsSeparator,
                    ''
                );
                valueBuffer += `${thousandsValue}.${decimal}`;
            } else if (hasThousands)
                valueBuffer += current.replaceAll(thousandsSeparator, '');
            else if (hasDecimal)
                valueBuffer += current.replaceAll(decimalSeparator, '.');
            else valueBuffer += current;
        } else {
            const unit = units[current];
            if (!unit) continue;

            if (!isOperator(previous)) valueBuffer += '*';
            valueBuffer += String(unit.ms);
            if (/[\d.]/.test(previous)) valueBuffer += ')';
        }

        if (valueBuffer.length > 0) {
            finalCode.push(valueBuffer);
            valueBuffer = '';
        }
    }

    if (finalCode.length === 0) return null;

    try {
        const code = finalCode.join('');
        // eslint-disable-next-line no-eval
        const result = eval(code) as number;
        return isNegative ? -result : result;
    } catch {
        return null;
    }
}

// HELPERS

/** Check that a value is a operator string. */
function isOperator(value: unknown): value is '-' | '*' | '/' | '+' {
    return value === '-' || value === '+' || value === '*' || value === '/';
}

/** Check that a value is a bracket. */
function isBracket(value: unknown): value is '(' | ')' {
    return value === '(' || value === ')';
}
