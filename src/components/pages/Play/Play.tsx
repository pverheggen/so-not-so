import { FigureRow } from 'components';
import { useState } from 'react';
import classes from './Play.module.css';
import { FigureRowData } from 'types';
import { puzzleService } from 'services';
import { createStyle } from 'utils';
import { useAnimations } from 'hooks';

const Play = (): JSX.Element => {
  const [rule] = useState(() => puzzleService.createRule());
  const [currentRow, setCurrentRow] = useState(() =>
    puzzleService.createFigureRow(0, rule),
  );
  const [pastRows, setPastRows] = useState<FigureRowData[]>([]);
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
    setCurrentRow(puzzleService.createFigureRow(pastRows.length + 1, rule));
    setPastRows([currentRow, ...pastRows]);
  };
  return (
    <>
      <div {...createStyle(classes.header)}>
        <FigureRow selectable figures={styledFigures} onClick={onClick} />
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
