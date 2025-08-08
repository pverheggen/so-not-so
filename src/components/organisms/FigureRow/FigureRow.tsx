import { SvgFigure } from 'components';
import classes from './FigureRow.module.css';
import { IFigureRowProps } from './types';
import { createStyle } from 'utils';

const FigureRow = ({
  onClick,
  selectable,
  figures,
  overrides,
}: IFigureRowProps) => {
  return (
    <div {...createStyle(classes.row, overrides?.row?.s)}>
      {figures?.map((figure, ifigure) => {
        switch (figure.type) {
          case 'svg':
            return (
              <SvgFigure
                key={figure}
                figure={figure}
                onClick={() => {
                  onClick?.(ifigure);
                }}
                selectable={selectable}
                overrides={overrides?.figures?.[ifigure]}
              />
            );
        }
      })}
    </div>
  );
};

export { FigureRow };
