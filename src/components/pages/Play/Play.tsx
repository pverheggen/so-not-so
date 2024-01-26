import { FigureRow } from "components";
import { useState } from "react";
import { FigureRowData, GridFigureTraits } from 'types';

const createFigureSymbols = (): GridFigureTraits =>
    Array(16)
        .fill(undefined)
        .map(() => Math.random() > 0.8 ? { color: 'light', shape: 'square' } : undefined);

const createFigureRow = (key: number): FigureRowData => ({
    key,
    figures: Array(4)
        .fill(undefined)
        .map(createFigureSymbols)
});

const Play = (): JSX.Element => {
    const [currentRow, setCurrentRow] = useState(() => createFigureRow(0));
    const [pastRows, setPastRows] = useState<FigureRowData[]>([]);
    const onClick = () => {
        setCurrentRow(createFigureRow(pastRows.length + 1));
        setPastRows([currentRow, ...pastRows]);
    };
    return (
        <>
            <FigureRow selectable figures={currentRow.figures} onClick={onClick} />
            {
                pastRows.map(({ key, figures }) => <FigureRow key={key} figures={figures} />)
            }
        </>
    );
}

export { Play };
