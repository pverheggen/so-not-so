import { TextFigureData } from 'types';
import { IStyleProps } from 'utils';

export interface ITextFigureProps {
  onClick?: () => void;
  figure: TextFigureData;
  s?: IStyleProps;
  pass?: boolean;
  selectable?: boolean;
}
