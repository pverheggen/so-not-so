import { SvgFigure } from 'components';
import classes from './PastRowGrid.module.css';
import { IPastRowGridProps } from './types';
import { createStyle } from 'utils';

const PastRowGrid = ({ pastRows, overrides }: IPastRowGridProps) => {
  return (
    <div {...createStyle(classes.ct)}>
      <div {...createStyle(classes.bg, overrides?.bg?.s)}>
        <div {...createStyle(classes.bgpass)}></div>
        <div {...createStyle(classes.bgfail)}></div>
      </div>
      <div {...createStyle(classes.grid, overrides?.grid?.s)}>
        {pastRows
          ?.map(({ figures }, irow) =>
            figures.map((figure, ifigure) => {
              switch (figure.type) {
                case 'svg':
                  return (
                    <SvgFigure
                      key={figure}
                      figure={figure}
                      overrides={{
                        figure: {
                          s: {
                            classNames:
                              ifigure === 0 ? classes.pass : classes.wrong,
                          },
                        },
                        ...(irow === 0
                          ? overrides?.firstRow?.[ifigure]
                          : undefined),
                      }}
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
