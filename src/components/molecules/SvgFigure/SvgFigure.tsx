import { Figure } from 'components';
import classes from './SvgFigure.module.css';
import { ISvgFigureProps } from './types';
import { createStyle } from 'utils';

const SvgFigure = ({
  onClick,
  selectable,
  figure,
  overrides,
}: ISvgFigureProps) => {
  const { path } = figure;
  return (
    <Figure onClick={onClick} selectable={selectable} s={overrides?.figure?.s}>
      <svg viewBox="0 0 12 12" {...createStyle(classes.svg, overrides?.svg?.s)}>
        <path className={classes.path} d={path.flat().join(' ')}></path>
      </svg>
      {overrides?.nextFigure && (
        <svg
          viewBox="0 0 12 12"
          {...createStyle(
            [classes.svg, classes.svgnext],
            overrides.nextFigure.s,
          )}
        >
          <path
            className={classes.path}
            d={overrides.nextFigure.figure.path.flat().join(' ')}
          ></path>
        </svg>
      )}
    </Figure>
  );
};

export { SvgFigure };
