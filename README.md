<div align='center'>
  <h1><strong>Enhanced MS</strong></h1>
  <i>Convert milliseconds to human-readable duration strings and vice versa</i><br>
  <code>npm install enhanced-ms</code>
</div>

<div align='center'>
  <img alt='package version' src='https://img.shields.io/npm/v/enhanced-ms?label=version'>
  <img alt='total downloads' src='https://img.shields.io/npm/dt/enhanced-ms'>
  <br>
  <a href='https://github.com/apteryxxyz/enhanced-ms'><img alt='enhanced-ms repo stars' src='https://img.shields.io/github/stars/apteryxxyz/enhanced-ms?style=social'></a>
  <a href='https://github.com/apteryxxyz'><img alt='apteryxxyz followers' src='https://img.shields.io/github/followers/apteryxxyz?style=social'></a>
  <a href='https://discord.gg/JKBvGndjDx'><img src='https://discordapp.com/api/guilds/829836158007115806/widget.png?style=shield' alt='discord shield'/></a>
</div>

## 🤔 About

`enhanced-ms` is a flexible library for formatting milliseconds into human-readable durations and vice versa. It is an enhanced version of the popular [`ms`](https://www.npmjs.com/package/ms) with support for multiple inputs, localization, and more options.

## 🏓 Table of Contents

- [📦 Installation](#-installation)
- [🧭 Comparison](#-comparison)
- [🚀 Usage](#-usage)
- [🌀 Examples](#-examples)

## 📦 Installation

Install using your preferred package manager:

```bash
npm install enhanced-ms
pnpm add enhanced-ms
yarn add enhanced-ms
```

## 🧭 Comparison

As mentioned above, `enhanced-ms` is an enhanced version of the popular [`ms`](https://www.npmjs.com/package/ms), so how does it compare?

| Feature                                         | `enhanced-ms` | [`ms`](https://www.npmjs.com/package/ms) | [`pretty-ms`](https://www.npmjs.com/package/pretty-ms) | [`itty-time`](https://www.npmjs.com/package/itty-time) |
| ----------------------------------------------- | ------------- | ---------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| Convert Milliseconds to Duration                | ✅            | ✅                                       | ✅                                                     | ✅                                                     |
| Convert Milliseconds to Multiple Duration Units | ✅            | ❌                                       | ❌                                                     | ❌                                                     |
| Convert Duration to Milliseconds                | ✅            | ✅                                       | ❌                                                     | ✅                                                     |
| Convert Multiple Duration Units to Milliseconds | ✅            | ❌                                       | ❌                                                     | ❌                                                     |
| Localization Support                            | ✅            | ❌                                       | ❌                                                     | ❌                                                     |

## 🌐 Languages

The currently supported languages include:

| Language          | Key |
| ----------------- | --- |
| English (default) | en  |
| German            | de  |
| Russian           | ru  |
| Māori             | mi  |

You can help by adding support for more languages.

Make a pull request [here](https://github.com/apteryxxyz/enhanced-ms/tree/main/src/languages).

## 🚀 Usage

### Language and Default Options

The `createMs` function allows you to create a new instance of `ms` with a custom language and custom default options. This is useful if you want to use a different language or prefer different default options for parsing and formatting.

```ts
function createMs(options?: CreateMsOptions): typeof ms;
```

| Option          | Type                             | Description                                                                                                                     | Default   |
| --------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `language`      | `Locale` \| `LanguageDefinition` | The language to use for parsing and formatting, if your preferred isn't supported, you can directly pass a language definition. | `en`      |
| `formatOptions` | `FormatOptions`                  | The options to use for formatting.                                                                                              | see below |
| `parseOptions`  | `ParseOptions`                   | The options to use for parsing.                                                                                                 | see below |

### Formatting Milliseconds to Duration

The `ms` function allows you to format a number of milliseconds to a duration string. Passing a number of milliseconds will return a duration string, if the number is invalid, it will return `null`.

```ts
function ms(milliseconds: number, options?: FormatOptions): string | null;
```

| Option             | Type                                 | Description                                              | Default |
| ------------------ | ------------------------------------ | -------------------------------------------------------- | ------- |
| `includeMs`        | `boolean`                            | Include the milliseconds in the output.                  | `false` |
| `includeSubMs`     | `boolean`                            | Include the sub-milliseconds in the output.              | `false` |
| `formatStyle`      | `'short'` \| `'long'`                | Specify the format style of the output.                  | `long`  |
| `insertAnd`        | `boolean`                            | Insert the `and` value between the units.                | `false` |
| `insertCommas`     | `boolean`                            | Insert commas between the units.                         | `false` |
| `firstUnitOnly`    | `boolean`                            | Only show the highest unit in the output                 | `false` |
| `unitCount`        | `number`                             | The number of units to show in the output, `-1` for all. | `-1`    |
| `roundingStrategy` | `'floor'` \| `'ceil'` \| `'nearest'` | The rounding strategy to use when cutting off units.     | `floor` |

### Parsing Duration to Milliseconds

The `ms` function also allows you to parse a duration string (`1 day`, `3 weeks 4 days`, etc). Passing a duration string will return a number of milliseconds, if no valid duration units are found, it will return `0`.

```ts
function ms(duration: string, options?: ParseOptions): number;
```

| Option | Type | Description | Default |
| ------ | ---- | ----------- | ------- |

N/A
