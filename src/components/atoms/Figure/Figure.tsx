import { IFigureProps } from './types';
import classes from './Figure.module.css';
import { addClassNames, createStyle } from 'utils';
import { Button } from '../Button';

const Figure = ({ children, onClick, s, selectable }: IFigureProps) => {
  if (!selectable) {
    return (
      <div {...createStyle([classes.figure, classes.div], s)}>{children}</div>
    );
  }
  return (
    <Button
      onClick={onClick}
      s={addClassNames([classes.figure, classes.button], s)}
    >
      {children}
    </Button>
  );
};

export { Figure };
