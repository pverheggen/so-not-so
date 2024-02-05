import { GridFigureTraits } from 'types';
import { IStyleProps } from 'utils';

export interface IFigureRowProps {
  figures?: GridFigureTraits[];
  onClick?: (figureIndex: number) => void;
  passIndex?: number;
  s?: IStyleProps;
  selectable?: boolean;
}
