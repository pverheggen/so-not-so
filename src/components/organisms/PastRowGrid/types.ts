import { FigureRowData } from 'types';
import { IStyleOverrides } from 'utils';

export interface IPastRowGridOverrides {
  grid?: IStyleOverrides;
  currentRow?: (IStyleOverrides | undefined)[];
}
export interface IPastRowGridProps {
  currentRow?: FigureRowData;
  pastRows: FigureRowData[];
  overrides?: IPastRowGridOverrides;
}
