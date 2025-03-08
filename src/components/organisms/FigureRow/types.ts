import { GridFigureData } from 'types';
import { IStyleProps } from 'utils';

export interface IFigureRowProps {
  figures?: GridFigureData[];
  figureStyles?: (IStyleProps | undefined)[];
  onClick?: (figureIndex: number) => void;
  passIndex?: number;
  s?: IStyleProps;
  selectable?: boolean;
}
