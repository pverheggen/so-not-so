import { GridFigure } from 'components';
import classes from './FigureRow.module.css';
import { IFigureRowProps } from './types';
import { createStyle } from 'utils';

const FigureRow = ({
  onClick,
  passIndex,
  selectable,
  s,
  figures,
}: IFigureRowProps): JSX.Element => {
  return (
    <div {...createStyle(classes.row, s)}>
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
