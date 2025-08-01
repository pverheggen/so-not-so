import { FigureData } from 'types';
import { IStyleOverrides } from 'utils';

export interface IFigureRowOverrides {
  row?: IStyleOverrides;
  figures?: (IStyleOverrides | undefined)[];
}

export interface IFigureRowProps {
  figures?: FigureData[];
  onClick?: (figureIndex: number) => void;
  passIndex?: number;
  selectable?: boolean;
  overrides?: IFigureRowOverrides;
}
