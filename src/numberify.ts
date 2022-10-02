import { isObject, isString } from './helpers';
import { defaultLanguageOptions, LanguageOptions } from './languages';

export interface NumberifyOptions {}
export const defaultNumberifyOptions: NumberifyOptions = {};

function isOperator(v: unknown): v is '-' | '+' | '*' | '/' {
    return (
        !!v &&
        typeof v === 'string' &&
        v.length === 1 &&
        (v === '-' || v === '+' || v === '*' || v === '/')
    );
}

export default function (
    input: string,
    _options: NumberifyOptions = defaultNumberifyOptions,
    language: LanguageOptions = defaultLanguageOptions
) {
    if (!isString(input)) throw new TypeError(`Expected a string, recieved a ${typeof input}`);

    const foundMatches = input.match(language.regex);
    if (!foundMatches || foundMatches.length === 0) return null;

    const finalCode = [];
    let bracketCount = 0;

    for (let i = 0; i < foundMatches.length; i++) {
        const [match, previous] = [foundMatches[i], foundMatches[i - 1]];

        if (isOperator(match)) finalCode.push(match);
        else if (/[0-9.,]+/.test(match)) {
            if (!isOperator(previous)) finalCode.push('+');
            finalCode.push('(', match);
            bracketCount++;
        } else {
            const unit = language.units[match];
            if (!isObject(unit)) continue;
            if (!isOperator(previous)) finalCode.push('*');
            finalCode.push(unit.ms);
        }
    }

    if (finalCode.length === 0) return null;

    try {
        const rightBrackets = bracketCount > 0 ? ')'.repeat(bracketCount) : '';
        const code = finalCode.join('') + rightBrackets;
        return new Function(`return ${code}`)();
    } catch (e) {
        return null;
    }
}
