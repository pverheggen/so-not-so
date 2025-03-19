import { GridFigure, SvgFigure, TextFigure } from 'components';
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
      {figures?.map((figure, ifigure) => {
        const props = {
          onClick: () => {
            onClick?.(ifigure);
          },
          pass: ifigure === passIndex,
          selectable,
          s: figureStyles?.[ifigure],
        };
        switch (figure.type) {
          case 'grid':
            return <GridFigure key={figure} figure={figure} {...props} />;
          case 'svg':
            return <SvgFigure key={figure} figure={figure} {...props} />;
          case 'text':
            return <TextFigure key={figure} figure={figure} {...props} />;
        }
      })}
    </div>
  );
};

export { FigureRow };
