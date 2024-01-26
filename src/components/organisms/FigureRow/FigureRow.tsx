import { GridFigure } from 'components';
import classes from './FigureRow.module.css';
import { IFigureRowProps } from './types';

const FigureRow = ({ selectable }: IFigureRowProps): JSX.Element => {
  return (
    <div className={classes.row}>
      <GridFigure selectable={selectable} />
      <GridFigure selectable={selectable} />
      <GridFigure selectable={selectable} />
      <GridFigure selectable={selectable} />
    </div>
  );
};

export { FigureRow };
