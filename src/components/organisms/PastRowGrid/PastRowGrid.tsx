import { SvgFigure } from 'components';
import classes from './PastRowGrid.module.css';
import { IPastRowGridProps } from './types';
import { createStyle } from 'utils';

const PastRowGrid = ({
  currentRow,
  pastRows,
  overrides,
}: IPastRowGridProps) => {
  return (
    <div {...createStyle(classes.ct)}>
      <div {...createStyle(classes.bg, overrides?.bg?.s)}>
        <div {...createStyle(classes.bgpass)}></div>
        <div {...createStyle(classes.bgfail)}></div>
      </div>
      <div {...createStyle(classes.grid, overrides?.grid?.s)}>
        {currentRow?.figures.map((figure, ifigure) => {
          switch (figure.type) {
            case 'svg':
              return (
                <SvgFigure
                  key={figure}
                  figure={figure}
                  pass={ifigure % 4 === 0}
                  s={overrides?.currentRow?.[ifigure]?.s}
                />
              );
          }
        })}
        {pastRows
          ?.map(({ figures }) =>
            figures.map((figure, ifigure) => {
              switch (figure.type) {
                case 'svg':
                  return (
                    <SvgFigure
                      key={figure}
                      figure={figure}
                      pass={ifigure % 4 === 0}
                    />
                  );
              }
            }),
          )
          .flat()}
      </div>
    </div>
  );
};

export { PastRowGrid };
