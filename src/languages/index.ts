import type { LanguageDefinition } from './helpers/definition-types';

import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import it from './it';
import mi from './mi';
import nl from './nl';
import ru from './ru';

// This prevents the whole language definition being included in the dts output
type Locale = 'de' | 'en' | 'es' | 'fr' | 'it' | 'mi' | 'nl' | 'ru';
type Languages = Record<Locale, LanguageDefinition>;
export const languages: Languages = { de, en, es, fr, it, mi, nl, ru };
