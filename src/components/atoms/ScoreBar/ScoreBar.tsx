import classes from './ScoreBar.module.css';
import { IScoreBarProps } from './types';
import { createStyle } from 'utils';

const ScoreBar = ({ maxScore, score }: IScoreBarProps): JSX.Element => {
  const segments = new Array(maxScore).fill(0).map((_, i) => i);
  return (
    <div {...createStyle(classes.bar)}>
      {segments.map((i) => (
        <div
          key={i}
          {...createStyle(classes.segment, {
            classNames: { [classes.filled]: score > i },
          })}
        ></div>
      ))}
    </div>
  );
};

export { ScoreBar };
