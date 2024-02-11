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
  arr.reduce(
    (prev, element) => {
      prev[element] = prev[element] + 1;
      return prev;
    },
    [0, 0, 0, 0],
  );

type Comparison = (element: number) => boolean;
type CreateQuantityComparison = (quantity: number) => Comparison;
type RuleCombination = (rule1: FigureRule, rule2: FigureRule) => FigureRule;

const lte: CreateQuantityComparison = (quantity) => (element) =>
  element <= quantity;
const eq: CreateQuantityComparison = (quantity) => (element) =>
  element === quantity;
const gte: CreateQuantityComparison = (quantity) => (element) =>
  element >= quantity;
const any: Comparison = gte(1);
const even: Comparison = (element) => element % 2 === 0;
const odd: Comparison = (element) => element % 2 === 1;

const ruleAnd: RuleCombination = (rule1, rule2) => (figure) =>
  rule1(figure) && rule2(figure);

const ruleNor: RuleCombination = (rule1, rule2) => (figure) =>
  !rule1(figure) && !rule2(figure);

const numberOfSymbolsInRegion = (
  region: keyof typeof regions,
  comparison: Comparison,
): FigureRule => {
  return (figure) =>
    comparison(
      figure.filter(
        (symbol, isymbol) => !!symbol && regions[region].includes(isymbol),
      ).length,
    );
};

const numberOfSymbols = (comparison: Comparison): FigureRule => {
  return (figure) => comparison(figure.filter((symbol) => !!symbol).length);
};

const rowColumnQuantity = (
  rowColumnIndices: number[],
  elementComparison: Comparison,
  rowColumnComparison: Comparison,
): FigureRule => {
  return (figure) => {
    const indicesWithSymbols = figure
      .map((symbol, isymbol) => (symbol ? isymbol : -1))
      .filter((symbol) => symbol >= 0);
    const rowColumnWithSymbols = indicesWithSymbols.map(
      (i) => rowColumnIndices[i],
    );
    return rowColumnComparison(
      arrayCounts(rowColumnWithSymbols).filter(elementComparison).length,
    );
  };
};

export const allRules: FigureRule[] = [
  numberOfSymbols(even),
  numberOfSymbols(odd),
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(eq(1)),
  numberOfSymbols(lte(2)),
  numberOfSymbols(gte(4)),
  numberOfSymbols(gte(5)),
  numberOfSymbolsInRegion('center', eq(1)),
  numberOfSymbolsInRegion('leftTopDiag', eq(3)),
  numberOfSymbolsInRegion('rightTopDiag', eq(3)),
  numberOfSymbolsInRegion('corners', eq(1)),
  numberOfSymbolsInRegion('edges', eq(2)),
  numberOfSymbolsInRegion('edges', even),
  numberOfSymbolsInRegion('edges', odd),
  rowColumnQuantity(symbolRowIndices, eq(2), any),
  rowColumnQuantity(symbolRowIndices, eq(3), any),
  rowColumnQuantity(symbolRowIndices, any, eq(1)),
  rowColumnQuantity(symbolRowIndices, any, eq(2)),
  rowColumnQuantity(symbolRowIndices, any, eq(3)),
  rowColumnQuantity(symbolRowIndices, any, eq(4)),
  rowColumnQuantity(symbolColumnIndices, eq(2), any),
  rowColumnQuantity(symbolColumnIndices, eq(3), any),
  rowColumnQuantity(symbolColumnIndices, any, eq(1)),
  rowColumnQuantity(symbolColumnIndices, any, eq(2)),
  rowColumnQuantity(symbolColumnIndices, any, eq(3)),
  rowColumnQuantity(symbolColumnIndices, any, eq(4)),
  ruleAnd(
    rowColumnQuantity(symbolRowIndices, eq(2), any),
    rowColumnQuantity(symbolColumnIndices, eq(2), any),
  ),
  ruleNor(
    rowColumnQuantity(symbolRowIndices, gte(3), any),
    rowColumnQuantity(symbolColumnIndices, gte(3), any),
  ),
  ruleNor(
    rowColumnQuantity(symbolRowIndices, gte(4), any),
    rowColumnQuantity(symbolColumnIndices, gte(4), any),
  ),
];
