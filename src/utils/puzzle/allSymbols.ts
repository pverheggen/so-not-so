const square = 'l 2 0 l 0 2 l -2 0 l 0 -2';
const triangle = 'm 1 0 l 1 2 l -2 0 l 1 -2';
const circle = 'm 1 0 a 1 1 0 0 1 0 2 a 1 1 0 0 1 0 -2';

const allSymbols = [
  square,
  // square with hline
  'l 2 0 l 0 2 l -2 0 l 0 -2 m 0 1 l 2 0',
  // square with vline
  'l 2 0 l 0 2 l -2 0 l 0 -2 m 1 0 l 0 2',
  // square with circle
  'l 2 0 l 0 2 l -2 0 l 0 -2 m 0.6 1 a 0.4 0.4 0 0 1 0.8 0 a 0.4 0.4 0 0 1 -0.8 0',
  triangle,
  // triangle with hline
  'm 1 0 l 1 2 l -2 0 l 1 -2 m -1 1 l 2 0',
  // triangle with vline
  'm 1 0 l 1 2 l -2 0 l 1 -2 l 0 2',
  circle,
  // circle with hline
  'm 1 0 a 1 1 0 0 1 0 2 a 1 1 0 0 1 0 -2 m -1 1 l 2 0',
  // circle with vline
  'm 1 0 a 1 1 0 0 1 0 2 a 1 1 0 0 1 0 -2 l 0 2',
  // circle with circle
  'm 1 0 a 1 1 0 0 1 0 2 a 1 1 0 0 1 0 -2 m -0.4 1 a 0.4 0.4 0 0 1 0.8 0 a 0.4 0.4 0 0 1 -0.8 0',
];

const basicSymbols = { square, triangle, circle };

const numbers = [
  'm 0 1 l 0 2 a 1 1 0 0 0 2 0 l 0 -2 a 1 1 0 0 0 -2 0 m 2 0 l -2 2',
  'm 0 1 l 1 -1 l 0 4 m -1 0 l 2 0',
  'm 0 1 a 1 1 0 0 1 2 0 l -2 3 l 2 0',
  'm 0 1 a 1 1 0 1 1 1 1 a 1 1 0 1 1 -1 1',
  'm 1 0 l -1 2 l 2 0 m 0 -2 l 0 4',
  'm 2 0 l -2 0 l 0 2 l 1 0 a 1 1 0 0 1 0 2 l -1 0',
  'm 2 1 l -1 2 l 0 1 a 1 1 0 0 0 2 0 a 1 1 0 0 0 -2 0',
  'l 2 0 l -1 2 l 0 2',
  'm 1 0 a 1 1 0 0 0 0 2 a 1 1 0 0 0 0 2 a 1 1 0 0 0 0 -2 a 1 1 0 0 0 0 -2',
  'm 1 0 a 1 1 0 0 0 0 2 a 1 1 0 0 0 0 -2 m 1 1 l 0 1 l -1 2',
  'm 1 0 a 1 1 0 0 0 0 2 a 1 1 0 0 0 0 -2 m 1 1 l 0 2 a 1 1 0 0 1 -2 0',
];

export { allSymbols, basicSymbols, numbers };
