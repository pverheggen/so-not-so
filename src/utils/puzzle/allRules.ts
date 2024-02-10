import { FigureRule } from 'types';

const regions = {
  center: [5, 6, 9, 10],
  leftTopDiag: [0, 5, 10, 15],
  rightTopDiag: [3, 6, 9, 12],
  corners: [0, 3, 12, 15],
  edges: [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15],
};

const symbolRowIndices = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
const symbolColumnIndices = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];

const arrayCounts = (arr: number[]): number[] =>
  arr.reduce((prev, element) => {
    prev[element] = (prev[element] ?? 0) + 1;
    return prev;
  }, [] as number[]);

type Comparison = (element: number) => boolean;
type CreateQuantityComparison = (quantity: number) => Comparison;

const lte: CreateQuantityComparison = (quantity) => (element) =>
  element <= quantity;
const eq: CreateQuantityComparison = (quantity) => (element) =>
  element === quantity;
const gte: CreateQuantityComparison = (quantity) => (element) =>
  element >= quantity;

const numberOfSymbolsInRegion = (
  region: keyof typeof regions,
  quantity: number,
): FigureRule => {
  return (figure) =>
    figure.filter(
      (symbol, isymbol) => !!symbol && regions[region].includes(isymbol),
    ).length === quantity;
};

const numberOfSymbols = (comparison: Comparison): FigureRule => {
  return (figure) => comparison(figure.filter((symbol) => !!symbol).length);
};

const rowColumnQuantity = (
  rowColumnIndices: number[],
  comparison: Comparison,
): FigureRule => {
  return (figure) => {
    const indicesWithSymbols = figure
      .map((symbol, isymbol) => (symbol ? isymbol : -1))
      .filter((symbol) => symbol >= 0);
    const rowColumnWithSymbols = indicesWithSymbols.map(
      (i) => rowColumnIndices[i],
    );
    return arrayCounts(rowColumnWithSymbols).some(comparison);
  };
};

const rowAndColumnQuantity = (comparison: Comparison): FigureRule => {
  const rowRule = rowColumnQuantity(symbolRowIndices, comparison);
  const columnRule = rowColumnQuantity(symbolColumnIndices, comparison);
  return (figure) => rowRule(figure) && columnRule(figure);
};

const noRowAndColumnQuantity = (comparison: Comparison): FigureRule => {
  const rowRule = rowColumnQuantity(symbolRowIndices, comparison);
  const columnRule = rowColumnQuantity(symbolColumnIndices, comparison);
  return (figure) => !rowRule(figure) && !columnRule(figure);
};

export const allRules = [
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(lte(2)),
  numberOfSymbols(gte(4)),
  numberOfSymbols(gte(5)),
  numberOfSymbolsInRegion('center', 1),
  numberOfSymbolsInRegion('leftTopDiag', 3),
  numberOfSymbolsInRegion('rightTopDiag', 3),
  numberOfSymbolsInRegion('corners', 1),
  numberOfSymbolsInRegion('edges', 2),
  rowColumnQuantity(symbolRowIndices, eq(2)),
  rowColumnQuantity(symbolRowIndices, eq(3)),
  rowColumnQuantity(symbolColumnIndices, eq(3)),
  rowColumnQuantity(symbolColumnIndices, eq(3)),
  rowAndColumnQuantity(eq(2)),
  noRowAndColumnQuantity(gte(3)),
  noRowAndColumnQuantity(gte(4)),
];
