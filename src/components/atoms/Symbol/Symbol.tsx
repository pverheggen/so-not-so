import classes from './Symbol.module.css';
import { ISymbolProps } from './types';
import { createStyle } from 'utils';

const Symbol = ({ s }: ISymbolProps) => {
  return (
    <div {...createStyle(classes.symbol, s)}></div>
  );
};

export { Symbol };
