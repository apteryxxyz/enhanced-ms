import { isObject, isString } from './helpers';
import { defaultLanguageOptions, LanguageOptions } from './languages';

export interface NumberifyOptions {}
export const defaultNumberifyOptions: NumberifyOptions = {};

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
        const match = foundMatches[i];
        const prevOp = /[-+*/]/.test(foundMatches[i - 1]);

        if (/[-+*/]/.test(match)) finalCode.push(match);
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
        return 0;
    }
}
