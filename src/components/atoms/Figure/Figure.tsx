import { IFigureProps } from './types';
import classes from './Figure.module.css';
import { createStyle } from 'utils';

const Figure = ({
  children,
  onClick,
  pass,
  s,
  selectable,
}: IFigureProps) => {
  return (
    <button
      type="button"
      disabled={!selectable}
      onClick={onClick}
      {...createStyle([classes.figure, { [classes.pass]: pass }], s)}
    >
      {children}
    </button>
  );
};

export { Figure };
