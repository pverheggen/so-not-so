import { FigureRowData, PuzzleGenerator } from 'types';
import { randomElement, randomInt, reseed } from 'utils';
import { allPuzzles } from './allRules';
import { bob } from './allSymbols';

export const createPuzzle = (): PuzzleGenerator => {
  const puzzle = randomElement(allPuzzles);
  reseed();
  return puzzle;
};

export const createFigureRow = (
  key: number,
  puzzle: PuzzleGenerator,
): FigureRowData => {
  const passes = [];
  const fails = [];
  const passesCount = 1;
  const failsCount = 2;
  while (passes.length < passesCount || fails.length < failsCount) {
    const { svg, pass } = puzzle();
    if (pass && passes.length < passesCount) {
      passes.push(svg);
    } else if (!pass && fails.length < failsCount) {
      fails.push(svg);
    }
  }
  const passIndex = randomInt(0, 2);
  const [figureToSplice] = passes;
  const figures = [...fails];
  figures.splice(passIndex, 0, figureToSplice);
  if (key === 0) {
    figures[2] = { type: 'svg', path: [bob] };
  }
  return {
    key,
    passIndex,
    figures,
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
  } as FigureRowData;
};
