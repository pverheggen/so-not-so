import { SvgFigure } from 'components';
import classes from './FigureRow.module.css';
import { IFigureRowProps } from './types';
import { createStyle } from 'utils';

const FigureRow = ({
  onClick,
  passIndex,
  selectable,
  figures,
  overrides,
}: IFigureRowProps) => {
  return (
    <div {...createStyle(classes.row, overrides?.row?.s)}>
      {figures?.map((figure, ifigure) => {
        const props = {
          onClick: () => {
            onClick?.(ifigure);
          },
          pass: ifigure === passIndex,
          selectable,
          s: overrides?.figures?.[ifigure]?.s,
        };
        switch (figure.type) {
          case 'svg':
            return <SvgFigure key={figure} figure={figure} {...props} />;
        }
      })}
    </div>
  );
};

export { FigureRow };
