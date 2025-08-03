import { ISvgFigureOverrides } from 'components';
import { FigureRowData } from 'types';
import { IStyleOverrides } from 'utils';

export interface IPastRowGridOverrides {
  grid?: IStyleOverrides;
  bg?: IStyleOverrides;
  firstRow?: (ISvgFigureOverrides | undefined)[];
}

export interface IPastRowGridProps {
  pastRows: FigureRowData[];
  overrides?: IPastRowGridOverrides;
}
