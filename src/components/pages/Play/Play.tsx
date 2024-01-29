import { FigureRow } from 'components';
import { useState } from 'react';
import classes from './Play.module.css';
import { FigureRowData } from 'types';
import { puzzleService } from 'services';

const Play = (): JSX.Element => {
  const [rule] = useState(() => puzzleService.createRule());
  const [currentRow, setCurrentRow] = useState(() =>
    puzzleService.createFigureRow(0, rule),
  );
  const [pastRows, setPastRows] = useState<FigureRowData[]>([]);
  const onClick = () => {
    setCurrentRow(puzzleService.createFigureRow(pastRows.length + 1, rule));
    setPastRows([currentRow, ...pastRows]);
  };
  return (
    <>
      <div className={classes.header}>
        <FigureRow selectable figures={currentRow.figures} onClick={onClick} />
      </div>
      {pastRows.map(({ key, figures, passIndex }) => (
        <FigureRow key={key} figures={figures} passIndex={passIndex} />
      ))}
    </>
  );
};

export { Play };
