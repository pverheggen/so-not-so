import { IFigureProps } from './types';
import classes from './Figure.module.css';
import classNames from 'classnames';

const Figure = ({ children, className }: IFigureProps): JSX.Element => {
  return (
    <div className={classNames(classes.figure, className)}>{children}</div>
  );
};

export { Figure };
