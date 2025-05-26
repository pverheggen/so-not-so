import { GridFigure, SvgFigure, TextFigure } from 'components';
import classes from './PastRowGrid.module.css';
import { IPastRowGridProps } from './types';
import { createStyle } from 'utils';

const PastRowGrid = ({ pastRows, s }: IPastRowGridProps) => {
  return (
    <div {...createStyle(classes.grid, s)}>
      {pastRows
        ?.map(({ figures, passIndex }) =>
          figures.map((figure, ifigure) => {
            const props = {
              pass: ifigure === passIndex,
            };
            switch (figure.type) {
              case 'grid':
                return <GridFigure key={figure} figure={figure} {...props} />;
              case 'svg':
                return <SvgFigure key={figure} figure={figure} {...props} />;
              case 'text':
                return <TextFigure key={figure} figure={figure} {...props} />;
            }
          }),
        )
        .flat()}
    </div>
  );
};

export { PastRowGrid };
