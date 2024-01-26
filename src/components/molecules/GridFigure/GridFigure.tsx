import { Figure, Symbol } from 'components';
import classes from './GridFigure.module.css';
import toStyleVars from 'utils/toStyleVars';
import { useMemo } from 'react';

const GridFigure = (): JSX.Element => {
  // For now, use randomly generated symbols
  const symbols = useMemo(
    () =>
      Array(16)
        .fill(false)
        .map(() => Math.random() > 0.8),
    [],
  );
  const createSymbol = (symbol: boolean, isymbol: number) => {
    if (!symbol) return null;
    const columnCount = 4;
    const row = Math.floor(isymbol / columnCount);
    const col = isymbol % columnCount;
    return (
      <Symbol
        key={isymbol}
        className={classes.symbol}
        style={toStyleVars({ row, col })}
      />
    );
  };
  return <Figure className={classes.grid}>{symbols.map(createSymbol)}</Figure>;
};

export { GridFigure };
