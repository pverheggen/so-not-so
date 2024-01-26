import { GridFigure } from 'components';
import classes from './FigureRow.module.css';

const FigureRow = (): JSX.Element => {
  return (
    <div className={classes.row}>
      <GridFigure />
      <GridFigure />
      <GridFigure />
      <GridFigure />
    </div>
  );
};

export { FigureRow };
