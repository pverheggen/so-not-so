import { useState } from 'preact/hooks';
import { FigureRow, ScoreBar } from 'components';
import classes from './Play.module.css';
import { FigureRowData } from 'types';
import { createStyle, puzzleUtils } from 'utils';
import { useAnimations } from 'hooks';
import { useRouter } from 'contexts';
import { PastRowGrid } from 'components/organisms/PastRowGrid';
import { Button } from 'components/atoms/Button';

const Play = () => {
  const { push } = useRouter();
  const [puzzle] = useState(() => puzzleUtils.createPuzzle());
  const [currentRow, setCurrentRow] = useState(() =>
    puzzleUtils.createFigureRow(3, puzzle),
  );
  const [pastRows, setPastRows] = useState<FigureRowData[]>(() => [
    puzzleUtils.sortRow(puzzleUtils.createFigureRow(2, puzzle)),
    puzzleUtils.sortRow(puzzleUtils.createFigureRow(1, puzzle)),
    puzzleUtils.sortRow(puzzleUtils.createFigureRow(0, puzzle)),
  ]);
  const [score, setScore] = useState(0);
  const currentRowAnimations = useAnimations();

  const maxScore = 8;
  const isWin = score >= maxScore;
  const { figures, passIndex } = currentRow;

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
    setCurrentRow(puzzleUtils.createFigureRow(pastRows.length + 1, puzzle));
    setPastRows([puzzleUtils.sortRow(currentRow), ...pastRows]);
    setScore((score) => score + 1);
  };
  return (
    <>
      <div {...createStyle(classes.header)}>
        <div {...createStyle(classes.nav)}>
          <Button
            s={{ classNames: classes.back }}
            onClick={() => {
              push('list');
            }}
          >
            Back
          </Button>
          <ScoreBar maxScore={maxScore} score={score} />
        </div>

        {isWin && <span {...createStyle(classes.win)}>You Win</span>}
        {!isWin && (
          <FigureRow
            selectable
            figures={figures}
            figureStyles={currentRowAnimations.styles}
            onClick={onClick}
          />
        )}
      </div>
      <div {...createStyle(classes.body)}>
        <PastRowGrid pastRows={pastRows} />
      </div>
    </>
  );
};

export { Play };
