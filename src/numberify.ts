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

function isBracket(v: unknown): v is '(' | ')' {
    return !!v && typeof v === 'string' && v.length === 1 && (v === '(' || v === ')');
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

    for (let i = 0; i < foundMatches.length; i++) {
        const [next, match, prev] = [foundMatches[i + 1], foundMatches[i], foundMatches[i - 1]];

        if (isOperator(match) || isBracket(match)) finalCode.push(match);
        else if (/[0-9 ,.]/.test(match)) {
            if (!isOperator(prev)) finalCode.push('+');
            if (language.units[next]) finalCode.push('(');
            const value = match
                .replaceAll(language.thousands, '')
                .replaceAll(language.decimal, '.');
            finalCode.push(value);
        } else {
            const unit = language.units[match];
            if (!isObject(unit)) continue;
            if (!isOperator(prev)) finalCode.push('*');
            finalCode.push(unit.ms + '');
            if (/[0-9.]/.test(prev)) finalCode.push(')');
        }
    }

    if (finalCode.length === 0) return null;

    try {
        const code = finalCode.join('');
        console.log(code);
        return new Function(`return ${code}`)();
    } catch {
        return null;
    }
}
