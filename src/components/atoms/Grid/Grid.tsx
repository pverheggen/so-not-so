import { IGridProps } from './types';
import classes from './Grid.module.css';
import toStyleVars from 'utils/toStyleVars';
import classNames from 'classnames';

const Grid = ({
  children,
  className,
  style,
  rows,
  columns,
}: IGridProps): JSX.Element => {
  return (
    <div
      className={classNames(classes.grid, className)}
      style={{ ...style, ...toStyleVars({ rows, columns }) }}
    >
      {children}
    </div>
  );
};

export { Grid };
