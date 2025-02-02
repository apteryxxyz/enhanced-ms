import type { Language } from '~/languages/helpers/make-language';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface ParseOptions {}

export const defaultParseOptions: ParseOptions = {};

/**
 * Resolves and normalises parsing options for a duration.
 *
 * - Currently, this function does nothing.
 *
 * @param options The user-provided options to resolve
 * @param language The language settings to apply for parsing
 * @returns The fully resolved parsing options, with defaults applied where necessary
 */
export function resolveOptions(options: ParseOptions, language: Language) {
  void options;
  void language;
  return {};
}
