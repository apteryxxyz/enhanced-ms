import { createMs } from './factory';
export const ms = createMs({ language: 'en' });
export default ms;

export { formatMilliseconds } from './format';
export {
  parseMilliseconds,
  parseUnits,
} from './format/helpers/parse-milliseconds';
export { getLanguage } from './languages/helpers/make-language';
export { languages } from './languages';
export { parseDuration } from './parse';
export { type Ms, createMs } from './factory';
export { Time, units } from './time';
