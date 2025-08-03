import { SvgFigureData } from 'types';
import { IStyleOverrides } from 'utils';

export interface ISvgFigureOverrides {
  svg?: IStyleOverrides;
  figure?: IStyleOverrides;
}

export interface ISvgFigureProps {
  onClick?: () => void;
  figure: SvgFigureData;
  pass?: boolean;
  selectable?: boolean;
  overrides?: ISvgFigureOverrides;
}
