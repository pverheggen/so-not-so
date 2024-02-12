import type { ComponentChildren } from 'preact';
import { IStyleProps } from 'utils/styles/types';

export interface IFigureProps {
  children?: ComponentChildren;
  s?: IStyleProps;
  onClick?: () => void;
  pass?: boolean;
  selectable?: boolean;
}
