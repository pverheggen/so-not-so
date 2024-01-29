import classNames from 'classnames';

export type IStyleVars = { [key: string]: string | number };

export interface IStyleProps {
  classNames?: classNames.Argument | classNames.ArgumentArray;
  styleVars?: IStyleVars;
}

export interface IStyle {
  className?: string;
  style?: React.CSSProperties;
}
