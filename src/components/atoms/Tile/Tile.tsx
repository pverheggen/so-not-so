import classNames from 'classnames';
import classes from './Tile.module.css';
import { ITileProps } from './types';

const Tile = ({ children, className, style }: ITileProps): JSX.Element => {
  return (
    <div className={classNames(classes.tile, className)} style={style}>
      {children}
    </div>
  );
};

export { Tile };
