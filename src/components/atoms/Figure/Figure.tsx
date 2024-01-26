import { IFigureProps } from './types';
import classes from './Figure.module.css';
import { createStyle } from 'utils';

const Figure = ({ children, onClick, s, selectable }: IFigureProps): JSX.Element => {
  return (
    <button type='button' disabled={!selectable} onClick={onClick} {...createStyle(classes.figure, s)}>{children}</button>
  );
};

export { Figure };
