import { Figure, Symbol } from 'components';
import classes from './GridFigure.module.css';
import { IGridFigureProps } from './types';
import { SymbolTraits } from 'types';

const GridFigure = ({ onClick, selectable, symbols }: IGridFigureProps): JSX.Element => {
  const createSymbol = (symbol: SymbolTraits, isymbol: number) => {
    if (!symbol) {
      return undefined;
    }
    const columnCount = 4;
    const row = Math.floor(isymbol / columnCount);
    const col = isymbol % columnCount;
    return (
      <Symbol
        key={isymbol}
        symbol={symbol}
        s={{ className: classes.symbol, styleVars: { row, col } }}
      />
    );
  };
  return <Figure onClick={onClick} selectable={selectable} s={{ className: classes.grid }}>{symbols?.map(createSymbol)}</Figure>;
};

export { GridFigure };
