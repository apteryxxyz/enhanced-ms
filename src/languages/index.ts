import type { LanguageDefinition } from './helpers/definition-types';

import de from './de';
import en from './en';
import mi from './mi';
import ru from './ru';

// This prevents the whole language definition being included in the dts output
type Locale = 'de' | 'en' | 'mi' | 'ru';
type Languages = Record<Locale, LanguageDefinition>;
export const languages: Languages = { de, en, mi, ru };
