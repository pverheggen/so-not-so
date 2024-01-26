import { GridFigure } from 'components';
import classes from './FigureRow.module.css';
import { IFigureRowProps } from './types';

const FigureRow = ({ onClick, selectable, figures }: IFigureRowProps): JSX.Element => {
  return (
    <div className={classes.row}>
      {
        figures?.map((symbols, ifigure) =>
          <GridFigure key={ifigure} onClick={() => { onClick?.(ifigure); }} symbols={symbols} selectable={selectable} />)
      }
    </div>
  );
};

export { FigureRow };
