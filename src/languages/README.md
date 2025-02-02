# Adding Translations

The following steps outline the process for adding a new language to `enhanced-ms`.

## 1. Fork and clone the repository

Fork the repository on GitHub and clone your fork to your local machine.

## 2. Create a new file

Create a new file in the `src/languages` directory with the locale code of the language you want to add. For example, if you want to add support for the French language, create a file named `fr.ts`.

## 3. Define the language definition

In the new file, define and export as default the language definition using the `LanguageDefinition` type from the `src/languages/helpers/definition-types` module. Refer to the existing language definitions for examples.

---

The `LanguageDefinition` type is a TypeScript interface that defines the structure of a language definition. It includes the following properties:

- `decimal`: The decimal separator used in the language, its opposite will be used for the thousands separator.
- `and`: Either a string that will be inserted between the second-to-last and last unit, or a function that accepts an array of strings and returns the appropriate string array.
- `units`: An object that maps unit names to their definitions. Each unit definition includes the following properties:
  - `name`: Either a string or a function that accepts a number representing the unit count and returns the name of the unit.
  - `abbreviation`: Either a string or a function that accepts a number representing the unit count and returns the abbreviation of the unit.
  - `matches`: An array of strings that will be used to match the unit in a duration string.

## 4. Add the language to the `languages` object and README

Add the new language to the `languages` object in the `src/languages/index.ts` file. Additionally, add the language to the root README file.

## 5. Add tests for the language

Add tests to ensure the library handles them correctly. You can use the existing tests as a reference. Refer to existing tests for examples.

## 6. Create a changeset and open a pull request

Once you're done, run `pnpm change` to create a changeset for the new language. Follow the prompts to describe the changes and select the appropriate type. Then, open a new pull request on the repository.
