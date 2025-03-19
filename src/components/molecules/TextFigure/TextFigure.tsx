import { Figure } from 'components';
import classes from './TextFigure.module.css';
import { ITextFigureProps } from './types';

const TextFigure = ({
  onClick,
  pass,
  selectable,
  figure,
  s,
}: ITextFigureProps) => {
  const { text } = figure;
  return (
    <Figure onClick={onClick} pass={pass} selectable={selectable} s={s}>
      <span className={classes.text}>{text}</span>
    </Figure>
  );
};

export { TextFigure };
