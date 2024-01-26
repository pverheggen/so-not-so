import { FigureRow } from "components";
import { useState } from "react";

const createFigureSymbols = () =>
    Array(16)
        .fill(undefined)
        .map(() => Math.random() > 0.8);

const createFigureRow = () =>
    Array(4)
        .fill(undefined)
        .map(createFigureSymbols);

const Play = (): JSX.Element => {
    const [currentRow, setCurrentRow] = useState(createFigureRow);
    const [pastRows, setPastRows] = useState<boolean[][][]>([]);
    const onClick = () => {
        setPastRows([currentRow, ...pastRows]);
        setCurrentRow(createFigureRow());
    };
    return (
        <>
            <FigureRow selectable figures={currentRow} onClick={onClick} />
            {
                pastRows.map((row, irow) => <FigureRow key={irow} figures={row} />)
            }
        </>
    );
}

export { Play };
