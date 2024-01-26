import classNames from 'classnames';
import { IStyleProps } from './types';
import toStyleVars from './toStyleVars';

const defaultStyleProps = {};

const createStyle = (
  className: string,
  {
    className: classNameArg,
    classNames: classNamesArg,
    styleVars,
  }: IStyleProps | undefined = defaultStyleProps,
) => ({
  className: classNames(
    className,
    classNameArg,
    ...(Array.isArray(classNamesArg) ? classNamesArg : [classNames]),
  ),
  style: toStyleVars(styleVars),
});

export { createStyle };
