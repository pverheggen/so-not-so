import { IStyleProps } from 'utils/styles/types';

export interface IFigureProps {
  children?: React.ReactNode;
  s?: IStyleProps;
  onClick?: () => void;
  pass?: boolean;
  selectable?: boolean;
}
