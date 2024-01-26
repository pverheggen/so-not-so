import classNames from 'classnames';
import classes from './Symbol.module.css';
import { ISymbolProps } from './types';

const Symbol = ({ style, className }: ISymbolProps): JSX.Element => {
  return (
    <div className={classNames(classes.symbol, className)} style={style}></div>
  );
};

export { Symbol };
