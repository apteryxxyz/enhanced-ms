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
        const prevOp = isOperator(previous);

        if (isOperator(previous)) finalCode.push(match);
        else if (/[0-9.,]+/.test(match)) {
            finalCode.push(prevOp ? '' : '+', '(', match);
            bracketCount++;
        } else {
            const unit = language.units[match];
            if (!isObject(unit)) continue;
            else {
                finalCode.push(prevOp ? '' : '*', unit.ms, ')');
                bracketCount--;
            }
        }
    }

    if (finalCode.length === 0) return null;

    try {
        const code = finalCode.join('') + ')'.repeat(bracketCount);
        return new Function(`return ${code}`)();
    } catch (e) {
        return null;
    }
}
