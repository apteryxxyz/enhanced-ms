export type Maybe<T> = T | null;

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

export type Options = {
  raw?: boolean;
  long?: boolean;
  ms?: boolean;
  and?: boolean;
};

export type OptionsNoRaw = Simplify<Options & { raw?: never | false }>;

export type OptionsRaw = Simplify<Options & { raw: true }>;

export type Raw = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};
