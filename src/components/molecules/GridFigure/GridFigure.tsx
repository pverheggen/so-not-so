import { Figure, Symbol } from 'components';
import classes from './GridFigure.module.css';
import { IGridFigureProps } from './types';
import { SymbolTraits } from 'types';

const GridFigure = ({
  onClick,
  pass,
  selectable,
  symbols,
}: IGridFigureProps): JSX.Element => {
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
        s={{ classNames: classes.symbol, styleVars: { row, col } }}
      />
    );
  };
  return (
    <Figure
      onClick={onClick}
      pass={pass}
      selectable={selectable}
      s={{ classNames: classes.grid }}
    >
      {symbols?.map(createSymbol)}
    </Figure>
  );
};

export { GridFigure };
