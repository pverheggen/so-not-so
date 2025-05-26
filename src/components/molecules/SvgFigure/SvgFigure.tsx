import { Figure } from 'components';
import classes from './SvgFigure.module.css';
import { ISvgFigureProps } from './types';

const SvgFigure = ({
  onClick,
  pass,
  selectable,
  figure,
  s,
}: ISvgFigureProps) => {
  const { path } = figure;
  return (
    <Figure onClick={onClick} pass={pass} selectable={selectable} s={s}>
      <svg viewBox="0 0 12 12" className={classes.svg}>
        <path className={classes.path} d={path.flat().join(' ')}></path>
      </svg>
    </Figure>
  );
};

export { SvgFigure };
