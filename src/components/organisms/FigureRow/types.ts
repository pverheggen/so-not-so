import { GridFigureTraits } from 'types';

export interface IFigureRowProps {
  figures?: GridFigureTraits[];
  onClick?: (figureIndex: number) => void;
  passIndex?: number;
  selectable?: boolean;
}
