import classNames from 'classnames';
import { JSX } from 'preact';

export type IStyleVars = { [key: string]: string | number };

export interface IStyleProps {
  classNames?: classNames.Argument | classNames.ArgumentArray;
  styleVars?: IStyleVars;
}

export interface IStyle {
  className?: string;
  style?: JSX.CSSProperties;
}

export interface IStyleOverrides {
  s?: IStyleProps;
}
