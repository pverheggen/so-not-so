import { SvgFigureData } from 'types';
import { IStyleOverrides } from 'utils';

interface INextFigure extends IStyleOverrides {
  figure: SvgFigureData;
}

export interface ISvgFigureOverrides {
  svg?: IStyleOverrides;
  figure?: IStyleOverrides;
  nextFigure?: INextFigure;
}

export interface ISvgFigureProps {
  onClick?: () => void;
  figure: SvgFigureData;
  selectable?: boolean;
  overrides?: ISvgFigureOverrides;
}
