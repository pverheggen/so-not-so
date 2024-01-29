import { GridFigure } from 'components';
import classes from './FigureRow.module.css';
import { IFigureRowProps } from './types';

const FigureRow = ({
  onClick,
  passIndex,
  selectable,
  figures,
}: IFigureRowProps): JSX.Element => {
  return (
    <div className={classes.row}>
      {figures?.map((symbols, ifigure) => (
        <GridFigure
          key={ifigure}
          onClick={() => {
            onClick?.(ifigure);
          }}
          symbols={symbols}
          pass={ifigure === passIndex}
          selectable={selectable}
        />
      ))}
    </div>
  );
};

export { FigureRow };
