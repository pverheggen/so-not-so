import { GridFigureTraits } from 'types';

export interface IGridFigureProps {
  onClick?: () => void;
  symbols: GridFigureTraits;
  selectable?: boolean;
}
