import { FigureRow } from 'components';
import { useState } from 'react';
import classes from './Play.module.css';
import { FigureRowData } from 'types';
import { puzzleService } from 'services';
import { useAnimations } from 'hooks';
import { createStyle } from 'utils';

const Play = (): JSX.Element => {
  const [rule] = useState(() => puzzleService.createRule());
  const [currentRow, setCurrentRow] = useState(() =>
    puzzleService.createFigureRow(0, rule),
  );
  const [pastRows, setPastRows] = useState<FigureRowData[]>([]);
  const {
    isPlaying,
    play,
    styles: [sHeader],
  } = useAnimations([
    {
      classNames: classes.flash,
      duration: 200,
    },
  ]);
  const onClick = async () => {
    if (isPlaying) return;
    await play();
    setCurrentRow(puzzleService.createFigureRow(pastRows.length + 1, rule));
    setPastRows([currentRow, ...pastRows]);
  };
  return (
    <>
      <div {...createStyle(classes.header, sHeader)}>
        <FigureRow selectable figures={currentRow.figures} onClick={onClick} />
      </div>
      {pastRows.map(({ key, figures, passIndex }) => (
        <FigureRow key={key} figures={figures} passIndex={passIndex} />
      ))}
    </>
  );
};

export { Play };
