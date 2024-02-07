import { GridFigureData } from 'types';

export interface IGridFigureProps {
  onClick?: () => void;
  figure: GridFigureData;
  pass?: boolean;
  selectable?: boolean;
}
