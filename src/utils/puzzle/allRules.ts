import { FigureRule, GridFigureTraits } from 'types';
import { chain, count, map } from './ruleUtils';

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

type RegionKey = keyof typeof regions;
type RegionArrayKey = keyof typeof regionArrays;

type FigureFilter = (figure: GridFigureTraits) => GridFigureTraits;
type FigureArrayMapper = (figure: GridFigureTraits) => GridFigureTraits[];
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

const regionArray = (regionArrayKey: RegionArrayKey): FigureArrayMapper => {
  const region = regionArrays[regionArrayKey];
  return (figure) =>
    figure.reduce(
      (prev, element, index) => {
        prev[region[index]].push(element);
        return prev;
      },
      [[], [], [], []] as GridFigureTraits[],
    );
};

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

const f_c_b = (c_b: NumberComparison): FigureRule => chain(count, c_b);

const f_r_c_b = (rKey: RegionKey, c_b: NumberComparison): FigureRule =>
  chain(region(rKey), count, c_b);

const f_ra_ca = (raKey: RegionArrayKey): NumberArrayRule =>
  chain(regionArray(raKey), map(count));

const f_ra_ca_c = (
  raKey: RegionArrayKey,
  cSymbol_b: NumberComparison,
): NumberRule => chain(f_ra_ca(raKey), map(cSymbol_b), count);

const f_ra_ca_c_b = (
  raKey: RegionArrayKey,
  cSymbol_b: NumberComparison,
  cRegion_b: NumberComparison,
): FigureRule => chain(f_ra_ca_c(raKey, cSymbol_b), cRegion_b);

export const allRules: FigureRule[] = [
  f_c_b(even),
  f_c_b(odd),
  f_c_b(eq(1)),
  f_c_b(eq(1)),
  f_c_b(eq(1)),
  f_c_b(eq(1)),
  f_c_b(eq(1)),
  f_c_b(lte(2)),
  f_c_b(gte(4)),
  f_c_b(gte(5)),
  f_r_c_b('center', eq(1)),
  f_r_c_b('leftTopDiag', eq(3)),
  f_r_c_b('rightTopDiag', eq(3)),
  f_r_c_b('corners', eq(1)),
  f_r_c_b('edges', eq(2)),
  f_r_c_b('edges', even),
  f_r_c_b('edges', odd),
  f_ra_ca_c_b('row', eq(2), any),
  f_ra_ca_c_b('row', eq(3), any),
  f_ra_ca_c_b('row', eq(4), any),
  f_ra_ca_c_b('row', any, eq(1)),
  f_ra_ca_c_b('row', any, eq(2)),
  f_ra_ca_c_b('row', any, eq(3)),
  f_ra_ca_c_b('row', any, gte(3)),
  f_ra_ca_c_b('col', eq(2), any),
  f_ra_ca_c_b('col', eq(3), any),
  f_ra_ca_c_b('col', eq(4), any),
  f_ra_ca_c_b('col', any, eq(1)),
  f_ra_ca_c_b('col', any, eq(2)),
  f_ra_ca_c_b('col', any, eq(3)),
  f_ra_ca_c_b('col', any, gte(3)),
  ruleAnd(f_ra_ca_c_b('row', eq(2), any), f_ra_ca_c_b('col', eq(2), any)),
  ruleNor(f_ra_ca_c_b('row', gte(3), any), f_ra_ca_c_b('col', gte(3), any)),
  ruleNor(f_ra_ca_c_b('row', gte(4), any), f_ra_ca_c_b('col', gte(4), any)),
  ruleEq(f_ra_ca_c('row', any), f_ra_ca_c('col', any)),
  ruleGt(f_ra_ca_c('row', any), f_ra_ca_c('col', any)),
  ruleGt(f_ra_ca_c('col', any), f_ra_ca_c('row', any)),
  ruleAnd(f_r_c_b('checker1', any), f_r_c_b('checker2', none)),
  ruleAnd(f_r_c_b('checker1', none), f_r_c_b('checker2', any)),
  ruleXor(f_r_c_b('checker1', any), f_r_c_b('checker2', any)),
  ruleAnd(f_r_c_b('checker1', any), f_r_c_b('checker2', any)),
  ruleArray(f_ra_ca('row'), arrayFirst(any, eq(2))),
  ruleArray(f_ra_ca('col'), arrayFirst(any, eq(2))),
  ruleArray(f_ra_ca('rowReverse'), arrayFirst(any, eq(2))),
  ruleArray(f_ra_ca('colReverse'), arrayFirst(any, eq(2))),
];
