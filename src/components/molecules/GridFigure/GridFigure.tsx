import { Figure, Symbol } from 'components';
import classes from './GridFigure.module.css';
import { IGridFigureProps } from './types';
import { SymbolTraits } from 'types';
import { addClassNames } from 'utils';

const GridFigure = ({
  onClick,
  pass,
  selectable,
  figure,
}: IGridFigureProps): JSX.Element => {
  const { traits, s } = figure;
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
      s={addClassNames(classes.grid, s)}
    >
      {traits.map(createSymbol)}
    </Figure>
  );
};

export { GridFigure };
