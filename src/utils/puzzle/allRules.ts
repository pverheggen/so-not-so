/* eslint-disable @typescript-eslint/no-unused-vars */
import { FigureRule } from 'types';

const regions = {
  center: [5, 6, 9, 10],
  leftTopDiag: [0, 5, 10, 15],
  rightTopDiag: [3, 6, 9, 12],
  corners: [0, 3, 12, 15],
  edges: [0, 1, 2, 3, 4, 7, 8, 11, 12, 15],
};

const symbolRowIndices = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
const symbolColumnIndices = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];

const arrayCounts = (arr: number[]): number[] =>
  arr.reduce((prev, element) => {
    prev[element] = (prev[element] ?? 0) + 1;
    return prev;
  }, [] as number[]);

type NumberComparison = (quantity: number) => (element: number) => boolean;

const lt: NumberComparison = (quantity) => (element) => element < quantity;
const eq: NumberComparison = (quantity) => (element) => element === quantity;
const gt: NumberComparison = (quantity) => (element) => element > quantity;

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

const rowColumnQuantity = (
  quantity: number,
  rowColumnIndices: number[],
  comparison: NumberComparison,
): FigureRule => {
  return (figure) => {
    const indicesWithSymbols = figure
      .map((symbol, isymbol) => (symbol ? isymbol : -1))
      .filter((symbol) => symbol >= 0);
    const rowColumnWithSymbols = indicesWithSymbols.map(
      (i) => rowColumnIndices[i],
    );
    const predicate = comparison(quantity);
    return arrayCounts(rowColumnWithSymbols).some(predicate);
  };
};

const rowAndColumnQuantity = (
  quantity: number,
  comparison: NumberComparison,
): FigureRule => {
  const rowRule = rowColumnQuantity(quantity, symbolRowIndices, comparison);
  const columnRule = rowColumnQuantity(
    quantity,
    symbolColumnIndices,
    comparison,
  );
  return (figure) => rowRule(figure) && columnRule(figure);
};

const noRowAndColumnQuantity = (
  quantity: number,
  comparison: NumberComparison,
): FigureRule => {
  const rowRule = rowColumnQuantity(quantity, symbolRowIndices, comparison);
  const columnRule = rowColumnQuantity(
    quantity,
    symbolColumnIndices,
    comparison,
  );
  return (figure) => !rowRule(figure) && !columnRule(figure);
};

export const allRules = [
  numberOfSymbols(1),
  numberOfSymbols(2),
  numberOfSymbols(3),
  numberOfSymbols(4),
  numberOfSymbols(5),
  numberOfSymbolsInRegion('center', 1),
  numberOfSymbolsInRegion('leftTopDiag', 3),
  numberOfSymbolsInRegion('rightTopDiag', 3),
  numberOfSymbolsInRegion('corners', 1),
  numberOfSymbolsInRegion('edges', 2),
  rowColumnQuantity(2, symbolRowIndices, eq),
  rowColumnQuantity(3, symbolRowIndices, eq),
  rowColumnQuantity(2, symbolColumnIndices, eq),
  rowColumnQuantity(3, symbolColumnIndices, eq),
  rowAndColumnQuantity(2, eq),
  noRowAndColumnQuantity(2, gt),
  noRowAndColumnQuantity(3, gt),
];
