import { FigureRule, GridFigureTraits } from 'types';
import { chain } from './ruleUtils';

const regions = {
  center: [5, 6, 9, 10],
  leftTopDiag: [0, 5, 10, 15],
  rightTopDiag: [3, 6, 9, 12],
  corners: [0, 3, 12, 15],
  edges: [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15],
  checker1: [0, 2, 5, 7, 8, 10, 13, 15],
  checker2: [1, 3, 4, 6, 9, 11, 12, 14],
};

const symbolRowIndices = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
const symbolColIndices = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
const symbolRowReverseIndices = [...symbolRowIndices].reverse();
const symbolColReverseIndices = [...symbolColIndices].reverse();

const regionArrays = {
  row: symbolRowIndices,
  col: symbolColIndices,
  rowReverse: symbolRowReverseIndices,
  colReverse: symbolColReverseIndices,
};

const arrayCounts = (arr: number[]): number[] =>
  arr.reduce(
    (prev, element) => {
      prev[element] = prev[element] + 1;
      return prev;
    },
    [0, 0, 0, 0],
  );

type FigureFilter = (figure: GridFigureTraits) => GridFigureTraits;
type RuleCombination = (rule1: FigureRule, rule2: FigureRule) => FigureRule;

type NumberComparison = (number: number) => boolean;
type CreateNumberComparison = (number: number) => NumberComparison;
type NumberRule = (figure: GridFigureTraits) => number;
type NumberRuleCombination = (
  rule1: NumberRule,
  rule2: NumberRule,
) => FigureRule;

type NumberArrayComparison = (array: number[]) => boolean;
type NumberArrayRule = (figure: GridFigureTraits) => number[];

const lte: CreateNumberComparison = (number) => (element) => element <= number;
const eq: CreateNumberComparison = (number) => (element) => element === number;
const gte: CreateNumberComparison = (number) => (element) => element >= number;
const any: NumberComparison = gte(1);
const none: NumberComparison = eq(0);
const even: NumberComparison = (element) => element % 2 === 0;
const odd: NumberComparison = (element) => element % 2 === 1;

const arrayFirst =
  (
    findComparison: NumberComparison,
    elementComparison: NumberComparison,
  ): NumberArrayComparison =>
  (array) => {
    const element = array.find(findComparison);
    return element === undefined ? false : elementComparison(element);
  };

const ruleArray = (
  rule: NumberArrayRule,
  comparison: NumberArrayComparison,
): FigureRule => {
  return (figure) => comparison(rule(figure));
};

const ruleAnd: RuleCombination = (rule1, rule2) => (figure) =>
  rule1(figure) && rule2(figure);

const ruleXor: RuleCombination = (rule1, rule2) => (figure) =>
  rule1(figure) != rule2(figure);

const ruleNor: RuleCombination = (rule1, rule2) => (figure) =>
  !rule1(figure) && !rule2(figure);

const ruleEq: NumberRuleCombination = (rule1, rule2) => (figure) =>
  rule1(figure) === rule2(figure);

const ruleGt: NumberRuleCombination = (rule1, rule2) => (figure) =>
  rule1(figure) > rule2(figure);

const region = (regionKey: keyof typeof regions): FigureFilter => {
  const region = regions[regionKey];
  return (figure) => region.map((ifigure) => figure[ifigure]);
};

const count = (figure: GridFigureTraits): number =>
  figure.filter((symbol) => !!symbol).length;

const f2count2b = (comparison: NumberComparison): FigureRule =>
  chain(count, comparison);

const f2region2count2b = (
  regionKey: keyof typeof regions,
  comparison: NumberComparison,
): FigureRule => chain(region(regionKey), count, comparison);

const allRowColumnCounts = (rowColumnIndices: number[]): NumberArrayRule => {
  return (figure) => {
    const indicesWithSymbols = figure
      .map((symbol, isymbol) => (symbol ? isymbol : -1))
      .filter((symbol) => symbol >= 0);
    const rowColumnWithSymbols = indicesWithSymbols.map(
      (i) => rowColumnIndices[i],
    );
    return arrayCounts(rowColumnWithSymbols);
  };
};

const rowColumnCount = (
  rowColumnIndices: number[],
  elementComparison: NumberComparison,
): NumberRule => {
  return (figure) =>
    allRowColumnCounts(rowColumnIndices)(figure).filter(elementComparison)
      .length;
};

const rowColumnCompare = (
  rowColumnIndices: number[],
  elementComparison: NumberComparison,
  rowColumnComparison: NumberComparison,
): FigureRule => {
  return (figure) =>
    rowColumnComparison(
      rowColumnCount(rowColumnIndices, elementComparison)(figure),
    );
};

export const allRules: FigureRule[] = [
  f2count2b(even),
  f2count2b(odd),
  f2count2b(eq(1)),
  f2count2b(eq(1)),
  f2count2b(eq(1)),
  f2count2b(eq(1)),
  f2count2b(eq(1)),
  f2count2b(lte(2)),
  f2count2b(gte(4)),
  f2count2b(gte(5)),
  f2region2count2b('center', eq(1)),
  f2region2count2b('leftTopDiag', eq(3)),
  f2region2count2b('rightTopDiag', eq(3)),
  f2region2count2b('corners', eq(1)),
  f2region2count2b('edges', eq(2)),
  f2region2count2b('edges', even),
  f2region2count2b('edges', odd),
  rowColumnCompare(symbolRowIndices, eq(2), any),
  rowColumnCompare(symbolRowIndices, eq(3), any),
  rowColumnCompare(symbolRowIndices, eq(4), any),
  rowColumnCompare(symbolRowIndices, any, eq(1)),
  rowColumnCompare(symbolRowIndices, any, eq(2)),
  rowColumnCompare(symbolRowIndices, any, eq(3)),
  rowColumnCompare(symbolRowIndices, any, gte(3)),
  rowColumnCompare(symbolColIndices, eq(2), any),
  rowColumnCompare(symbolColIndices, eq(3), any),
  rowColumnCompare(symbolColIndices, eq(4), any),
  rowColumnCompare(symbolColIndices, any, eq(1)),
  rowColumnCompare(symbolColIndices, any, eq(2)),
  rowColumnCompare(symbolColIndices, any, eq(3)),
  rowColumnCompare(symbolColIndices, any, gte(3)),
  ruleAnd(
    rowColumnCompare(symbolRowIndices, eq(2), any),
    rowColumnCompare(symbolColIndices, eq(2), any),
  ),
  ruleNor(
    rowColumnCompare(symbolRowIndices, gte(3), any),
    rowColumnCompare(symbolColIndices, gte(3), any),
  ),
  ruleNor(
    rowColumnCompare(symbolRowIndices, gte(4), any),
    rowColumnCompare(symbolColIndices, gte(4), any),
  ),
  ruleEq(
    rowColumnCount(symbolRowIndices, any),
    rowColumnCount(symbolColIndices, any),
  ),
  ruleGt(
    rowColumnCount(symbolRowIndices, any),
    rowColumnCount(symbolColIndices, any),
  ),
  ruleGt(
    rowColumnCount(symbolColIndices, any),
    rowColumnCount(symbolRowIndices, any),
  ),
  ruleAnd(
    f2region2count2b('checker1', any),
    f2region2count2b('checker2', none),
  ),
  ruleAnd(
    f2region2count2b('checker1', none),
    f2region2count2b('checker2', any),
  ),
  ruleXor(f2region2count2b('checker1', any), f2region2count2b('checker2', any)),
  ruleAnd(f2region2count2b('checker1', any), f2region2count2b('checker2', any)),
  ruleArray(allRowColumnCounts(symbolRowIndices), arrayFirst(any, eq(2))),
  ruleArray(allRowColumnCounts(symbolColIndices), arrayFirst(any, eq(2))),
  ruleArray(
    allRowColumnCounts(symbolRowReverseIndices),
    arrayFirst(any, eq(2)),
  ),
  ruleArray(
    allRowColumnCounts(symbolColReverseIndices),
    arrayFirst(any, eq(2)),
  ),
];
