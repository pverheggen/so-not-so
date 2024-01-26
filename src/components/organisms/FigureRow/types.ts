import { GridFigureTraits } from 'types';

export interface IFigureRowProps {
  figures?: GridFigureTraits[];
  onClick?: (figureIndex: number) => void;
  selectable?: boolean;
}
