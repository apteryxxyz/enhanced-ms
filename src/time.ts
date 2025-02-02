export const Time = {
  Nanosecond: 0.000_001,
  Microsecond: 0.001,
  Millisecond: 1,
  Second: 1_000,
  Minute: 60_000,
  Hour: 3_600_000,
  Day: 86_400_000, // 24 hours
  Week: 604_800_000, // 7 days
  Month: 2_628_000_000, // 28 days
  Year: 31_536_000_000, // 365 days
  Decade: 315_360_000_000, // 10 years
  Century: 3_153_600_000_000, // 100 years
  Millennium: 31_536_000_000_000, // 1000 years
} as const satisfies Record<string, number>;
export type Time = (typeof Time)[keyof typeof Time];

export const units = {
  nanosecond: 0.000_001,
  microsecond: 0.001,
  millisecond: 1,
  second: 1_000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000, // 24 hours
  week: 604_800_000, // 7 days
  month: 2_628_000_000, // 28 days
  year: 31_536_000_000, // 365 days
  decade: 315_360_000_000, // 10 years
  century: 3_153_600_000_000, // 100 years
  millennium: 31_536_000_000_000, // 1000 years
} as const satisfies Record<string, number>;
