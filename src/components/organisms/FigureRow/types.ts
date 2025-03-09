import { FigureData } from 'types';
import { IStyleProps } from 'utils';

export interface IFigureRowProps {
  figures?: FigureData[];
  figureStyles?: (IStyleProps | undefined)[];
  onClick?: (figureIndex: number) => void;
  passIndex?: number;
  s?: IStyleProps;
  selectable?: boolean;
}
