import { createMs } from './factory';
export const ms = createMs({ language: 'en' });
export default ms;

export { getLanguage } from './languages/helpers/make-language';
export { languages } from './languages';
export { createMs } from './factory';
export { formatMilliseconds } from './format';
export { parseDuration } from './parse';
export { Time, units } from './time';
