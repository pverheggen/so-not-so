import { FigureRowData, FigureRule, GridFigureTraits } from 'types';
import { randomInt } from 'utils';
import { allRules } from './allRules';

export const createRule = (): FigureRule => {
  const ruleIndex = randomInt(0, allRules.length - 1);
  return allRules[ruleIndex];
};

export const createFigureSymbols = (): GridFigureTraits => {
  return Array(16)
    .fill(undefined)
    .map(() =>
      Math.random() > 0.8 ? { color: 'light', shape: 'square' } : undefined,
    );
};

export const createFigureRow = (
  key: number,
  rule: FigureRule,
): FigureRowData => {
  const passes = [];
  const fails = [];
  const passesCount = 1;
  const failsCount = 3;
  while (passes.length < passesCount || fails.length < failsCount) {
    const figure = createFigureSymbols();
    if (figure.every((symbol) => symbol === undefined)) {
      continue;
    }
    const isRule = rule(figure);
    if (isRule && passes.length < passesCount) {
      passes.push(figure);
    } else if (!isRule && fails.length < failsCount) {
      fails.push(figure);
    }
  }
  const passIndex = randomInt(0, 3);
  const [figureToSplice] = passes;
  const figures = [...fails];
  figures.splice(passIndex, 0, figureToSplice);
  return {
    key,
    passIndex,
    figures: figures.map((traits) => ({ traits })),
  };
};

export const sortRow = (row: FigureRowData): FigureRowData => {
  const { figures: prevFigures, passIndex } = row;
  const figures = [...prevFigures];
  const [figureToSplice] = figures.splice(passIndex, 1);
  figures.splice(0, 0, figureToSplice);
  return {
    ...row,
    passIndex: 0,
    figures,
  };
};
