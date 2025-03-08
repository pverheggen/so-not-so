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
  figureStyles,
}: IFigureRowProps) => {
  return (
    <div {...createStyle(classes.row, s)}>
      {figures?.map((figure, ifigure) => (
        <GridFigure
          key={ifigure}
          onClick={() => {
            onClick?.(ifigure);
          }}
          figure={figure}
          pass={ifigure === passIndex}
          selectable={selectable}
          s={figureStyles?.[ifigure]}
        />
      ))}
    </div>
  );
};

export { FigureRow };
