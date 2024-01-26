import { IFigureProps } from './types';
import classes from './Figure.module.css';
import { createStyle } from 'utils';

const Figure = ({ children, s }: IFigureProps): JSX.Element => {
  return (
    <div {...createStyle(classes.figure, s)}>{children}</div>
  );
};

export { Figure };
