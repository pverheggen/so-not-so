import { Figure, Symbol } from 'components';
import classes from './GridFigure.module.css';
import { IGridFigureProps } from './types';

const GridFigure = ({ onClick, selectable, symbols }: IGridFigureProps): JSX.Element => {
  const createSymbol = (symbol: boolean, isymbol: number) => {
    if (!symbol) return null;
    const columnCount = 4;
    const row = Math.floor(isymbol / columnCount);
    const col = isymbol % columnCount;
    return (
      <Symbol
        key={isymbol}
        s={{ className: classes.symbol, styleVars: { row, col } }}
      />
    );
  };
  return <Figure onClick={onClick} selectable={selectable} s={{ className: classes.grid }}>{symbols?.map(createSymbol)}</Figure>;
};

export { GridFigure };
