import { useState } from 'preact/hooks';
import {
  Button,
  FigureRow,
  IFigureRowOverrides,
  IPastRowGridOverrides,
  PastRowGrid,
  ScoreBar,
} from 'components';
import classes from './Play.module.css';
import { FigureRowData } from 'types';
import { createStyle, puzzleUtils } from 'utils';
import { useAnimations } from 'hooks';
import { useRouter } from 'contexts';

interface IPlayOverrides {
  figureRow?: IFigureRowOverrides;
  pastRowGrid?: IPastRowGridOverrides;
}

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
  const currentRowAnimations = useAnimations<IPlayOverrides>();

  const maxScore = 8;
  const isWin = score >= maxScore;
  const { figures, passIndex } = currentRow;

  const onClick = async (figureIndex: number) => {
    if (currentRowAnimations.isPlaying) {
      return;
    }
    if (figureIndex !== passIndex) {
      setScore(0);
      return currentRowAnimations.play(300, {
        figureRow: {
          figures: figures.map((_, ifigure) =>
            figureIndex === ifigure
              ? {
                  s: {
                    classNames: classes.wrong,
                    styleVars: {
                      dur: '300ms',
                    },
                  },
                }
              : undefined,
          ),
        },
      });
    }
    setPastRows([puzzleUtils.sortRow(currentRow), ...pastRows]);
    await currentRowAnimations.play(500, {
      figureRow: {
        figures: figures.map((_, ifigure) =>
          figureIndex === ifigure
            ? {
                s: {
                  classNames: classes.right,
                  styleVars: {
                    dur: '500ms',
                  },
                },
              }
            : undefined,
        ),
      },
      pastRowGrid: {
        grid: {
          s: {
            classNames: classes.mover,
            styleVars: {
              dur: '500ms',
            },
          },
        },
        bg: {
          s: {
            classNames: classes.moverbg,
            styleVars: {
              dur: '500ms',
            },
          },
        },
      },
    });
    setCurrentRow(puzzleUtils.createFigureRow(pastRows.length + 1, puzzle));
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
            onClick={onClick}
            overrides={currentRowAnimations.overrides?.figureRow}
          />
        )}
      </div>
      <div {...createStyle(classes.body)}>
        <PastRowGrid
          pastRows={pastRows}
          overrides={currentRowAnimations.overrides?.pastRowGrid}
        />
      </div>
    </>
  );
};

export { Play };
