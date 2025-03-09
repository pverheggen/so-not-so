import { SvgFigureData } from 'types';
import { IStyleProps } from 'utils';

export interface ISvgFigureProps {
  onClick?: () => void;
  figure: SvgFigureData;
  s?: IStyleProps;
  pass?: boolean;
  selectable?: boolean;
}
