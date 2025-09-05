import { IFigureProps } from './types';
import classes from './Button.module.css';
import { createStyle } from 'utils';

const Button = ({ children, onClick, disabled, s }: IFigureProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      /* iOS, lol */
      onTouchStart={() => {}}
      {...createStyle([classes.button], s)}
    >
      {children}
    </button>
  );
};

export { Button };
