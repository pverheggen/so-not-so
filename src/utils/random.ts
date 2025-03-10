export const randomInt = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

export const randomElement = <T>(arr: T[]): T =>
  arr[randomInt(0, arr.length - 1)];
