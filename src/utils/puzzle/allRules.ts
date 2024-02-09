import { FigureRule } from 'types';

const regions = {
  center: [5, 6, 9, 10],
  leftTopDiag: [0, 5, 10, 15],
  rightTopDiag: [3, 6, 9, 12],
  corners: [0, 3, 12, 15],
  edges: [0, 1, 2, 3, 4, 7, 8, 11, 12, 15],
};

const numberOfSymbolsInRegion = (
  region: keyof typeof regions,
  quantity: number,
): FigureRule => {
  return (figure) =>
    figure.filter(
      (symbol, isymbol) => !!symbol && regions[region].includes(isymbol),
    ).length === quantity;
};

const numberOfSymbols = (quantity: number): FigureRule => {
  return (figure) => figure.filter((symbol) => !!symbol).length === quantity;
};

export const allRules = [
  numberOfSymbols(1),
  numberOfSymbols(2),
  numberOfSymbols(3),
  numberOfSymbols(4),
  numberOfSymbols(5),
  numberOfSymbolsInRegion('center', 1),
  numberOfSymbolsInRegion('leftTopDiag', 1),
  numberOfSymbolsInRegion('rightTopDiag', 1),
  numberOfSymbolsInRegion('corners', 1),
  numberOfSymbolsInRegion('edges', 2),
];
