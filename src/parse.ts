import { type LanguageOptions, defaultLanguageOptions } from './languages';

// biome-ignore lint/suspicious/noEmptyInterface: No options yet
export interface ParseOptions {}
export const defaultParseOptions: ParseOptions = {};

/**
 * Parse a human readable string into milliseconds.
 * @param input Timeframe string.
 * @param _options Options for parsing, not used yet.
 * @param language Language options.
 * @returns The number of milliseconds or null if the input is invalid.
 */
export function parse(
  input: string,
  _options: ParseOptions = defaultParseOptions,
  language: LanguageOptions = defaultLanguageOptions,
) {
  // There are no time measurements in a string less than 2 characters
  if (input.length <= 1) return null;

  const foundMatches = input.match(language.matcherRegex);
  if (!foundMatches || foundMatches.length === 0) return null;
  const isNegative = foundMatches[0] === '-';
  if (isNegative) foundMatches.shift();

  const finalCode: string[] = [];
  let valueBuffer = '';

  for (let i = 0; i < foundMatches.length; i++) {
    const [previous, current, next] = [
      foundMatches[i - 1],
      foundMatches[i]!,
      foundMatches[i + 1],
    ];

    if (isOperator(current) || isBracket(current)) {
      valueBuffer += current;
    }
    //
    else if (/[\d ,.]/.test(current)) {
      if (previous && !isOperator(previous)) valueBuffer += '+';
      if (next && next in language.units) valueBuffer += '(';

      const hasThousands = current.includes(language.thousandsSeparator);
      const hasDecimal = current.includes(language.decimalSeparator);

      // Replace the thousands separator with nothing, and the decimal separator with a dot
      if (hasThousands && hasDecimal) {
        const [_thousands, decimal] = current.split(language.decimalSeparator);
        const thousands = (_thousands ?? '') //
          .replaceAll(language.thousandsSeparator, '');
        valueBuffer += `${thousands}.${decimal}`;
      } else if (hasThousands)
        valueBuffer += current.replaceAll(language.thousandsSeparator, '');
      else if (hasDecimal)
        valueBuffer += current.replaceAll(language.decimalSeparator, '.');
      else valueBuffer += current;
    }
    //
    else {
      const unit = language.units[current];
      if (!unit) continue;

      if (previous && !isOperator(previous)) valueBuffer += '*';
      valueBuffer += String(unit.ms);
      if (previous && /[\d.]/.test(previous)) valueBuffer += ')';
    }

    if (valueBuffer.length > 0) {
      finalCode.push(valueBuffer);
      valueBuffer = '';
    }
  }

  if (finalCode.length === 0) return null;
  try {
    const code = finalCode.join('');
    const result = new Function(`return ${code}`)();
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
