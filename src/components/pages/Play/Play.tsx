import { FigureRow } from 'components';
import { useState } from 'react';
import classes from './Play.module.css';
import { FigureRowData } from 'types';
import { puzzleService } from 'services';
import { createStyle } from 'utils';

const Play = (): JSX.Element => {
  const [rule] = useState(() => puzzleService.createRule());
  const [currentRow, setCurrentRow] = useState(() =>
    puzzleService.createFigureRow(0, rule),
  );
  const [pastRows, setPastRows] = useState<FigureRowData[]>([]);
  const onClick = async () => {
    setCurrentRow(puzzleService.createFigureRow(pastRows.length + 1, rule));
    setPastRows([currentRow, ...pastRows]);
  };
  return (
    <>
      <div {...createStyle(classes.header)}>
        <FigureRow selectable figures={currentRow.figures} onClick={onClick} />
      </div>
      {pastRows.map(({ key, figures, passIndex }) => (
        <FigureRow key={key} figures={figures} passIndex={passIndex} s={{ classNames: classes.row }} />
      ))}
    </>
  );
};

export { Play };
