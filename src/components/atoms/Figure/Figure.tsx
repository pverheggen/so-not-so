import { IFigureProps } from './types';
import classes from './Figure.module.css';
import { addClassNames, createStyle } from 'utils';
import { Button } from '../Button';

const Figure = ({ children, onClick, pass, s, selectable }: IFigureProps) => {
  if (!selectable) {
    return (
      <div
        {...createStyle(
          [classes.div, classes.figure, { [classes.pass]: pass }],
          s,
        )}
      >
        {children}
      </div>
    );
  }
  return (
    <Button
      onClick={onClick}
      s={addClassNames(
        [classes.figure, classes.button, { [classes.pass]: pass }],
        s,
      )}
    >
      {children}
    </Button>
  );
};

export { Figure };
