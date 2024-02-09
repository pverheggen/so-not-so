import { FigureRow, ScoreBar } from 'components';
import { useState } from 'react';
import classes from './Play.module.css';
import { FigureRowData } from 'types';
import { createStyle, puzzleUtils } from 'utils';
import { useAnimations } from 'hooks';

const Play = (): JSX.Element => {
  const [rule] = useState(() => puzzleUtils.createRule());
  const [currentRow, setCurrentRow] = useState(() =>
    puzzleUtils.createFigureRow(0, rule),
  );
  const [pastRows, setPastRows] = useState<FigureRowData[]>([]);
  const [score, setScore] = useState(0);
  const currentRowAnimations = useAnimations();
  const { figures, passIndex } = currentRow;
  const styledFigures = currentRowAnimations.styles
    ? figures.map((figure, ifigure) => ({
      ...figure,
      s: currentRowAnimations.styles[ifigure],
    }))
    : figures;
  const onClick = async (figureIndex: number) => {
    if (currentRowAnimations.isPlaying) {
      return;
    }
    if (figureIndex !== passIndex) {
      setScore(0);
      return currentRowAnimations.play(
        figures.map(
          (_, ifigure) =>
            figureIndex === ifigure && {
              classNames: classes.wrong,
              duration: 300,
            },
        ),
      );
    }
    setCurrentRow(puzzleUtils.createFigureRow(pastRows.length + 1, rule));
    setPastRows([currentRow, ...pastRows]);
    setScore((score) => score + 1);
  };
  return (
    <>
      <div {...createStyle(classes.header)}>
        <FigureRow selectable figures={styledFigures} onClick={onClick} />
        <ScoreBar maxScore={8} score={score} />
      </div>
      {pastRows.map(({ key, figures, passIndex }) => (
        <FigureRow
          key={key}
          figures={figures}
          passIndex={passIndex}
          s={{ classNames: classes.row }}
        />
      ))}
    </>
  );
};

export { Play };
