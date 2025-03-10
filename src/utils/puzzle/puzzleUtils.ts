import {
  FigureRowData,
  FigureRule,
  GridFigureData,
  GridFigureTraits,
  SvgFigureData,
  SvgPathSegment,
} from 'types';
import { randomElement, randomInt } from 'utils';
import { allRules } from './allRules';
import allSymbols from './allSymbols';

export const createRule = (): FigureRule => randomElement(allRules);

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
  const figureTraits = [...fails];
  figureTraits.splice(passIndex, 0, figureToSplice);
  const figures: GridFigureData[] = figureTraits.map((traits) => ({
    type: 'grid',
    traits,
  }));
  return {
    key,
    passIndex,
    figures: figures.map(gridToSvg),
  };
};

const gridToSvg = ({ traits }: GridFigureData): SvgFigureData => ({
  type: 'svg',
  path: traits
    .map((trait, itrait) => {
      if (!trait) {
        return undefined;
      }
      const columnCount = 4;
      const row = Math.floor(itrait / columnCount);
      const col = itrait % columnCount;
      const symbol = randomElement(allSymbols);
      return `M${0.5 + row * 3} ${0.5 + col * 3} ${symbol}`;
    })
    .filter((segment): segment is SvgPathSegment => !!segment),
});

export const sortRow = (row: FigureRowData): FigureRowData => {
  const { figures: prevFigures, passIndex } = row;
  const figures = [...prevFigures];
  const [figureToSplice] = figures.splice(passIndex, 1);
  figures.splice(0, 0, figureToSplice);
  return {
    ...row,
    passIndex: 0,
    figures,
  } as FigureRowData;
};
