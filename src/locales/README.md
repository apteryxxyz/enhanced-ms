# Translation Guide

Each of the localisation files should export the following `Language` interface:

```ts
export interface Language {
    decimal: '.' | ',';
    and: string;
    units: Unit[];
}

export interface Unit {
    key: keyof typeof measurements;
    name: string | ((count: number) => string);
    abbreviation?: string | ((count: number) => string);
    matches: string[];
}
```

## Language Interface

-   `decimal` should be the decimal separator the language uses, `.` or `,`.

-   `and` should be the version of 'and' in the language.

-   `units` is an array of the following interface:

## Unit Interface

-   `key` is used for the module to identify which unit this is, it should the English short name. For example 'ms', 's', 'm', 'h' etc. You can view the existing translations for more examples.

-   `name` is the actual name of the unit in the language, it can either be a string, or a function that returns a string, where the `count` parameter is the unit amount, any number above 0.

-   `abbreviation` is the short name of for the unit. It is optional, however if any of the units are missing its `abbreviation` property, all unit abbreviations will be ignored, disabling use of `shortFormat: true`. Like `name`, this can be either a string or a function.

-   `matches` should be an array of strings that the module will use to find matches in the string inputs. The array should contain any variation of the unit name. For example, in English, 'y', 'yr' and 'year' are all ways of representing a year.

## Examples

You can always view the existing translations for examples.

## Final Steps

When adding a locale, you will also need to import and export it in the `languages.ts` file.

Please also add tests in the `test` folder.

And finally update the root `README.md` to include the language in the list of supported languages.
