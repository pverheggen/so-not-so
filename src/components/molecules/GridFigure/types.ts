import { GridFigureData } from 'types';
import { IStyleProps } from 'utils';

export interface IGridFigureProps {
  onClick?: () => void;
  figure: GridFigureData;
  s?: IStyleProps;
  pass?: boolean;
  selectable?: boolean;
}
