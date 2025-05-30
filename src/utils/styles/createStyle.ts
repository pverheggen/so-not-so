import classNames from 'classnames';
import { IStyle, IStyleProps } from './types';
import toStyleVars from './toStyleVars';

const defaultStyleProps = {};

const createStyle = (
  classNamesArg: classNames.Argument | classNames.ArgumentArray,
  {
    classNames: classNamesOverride,
    styleVars,
  }: IStyleProps | undefined = defaultStyleProps,
): IStyle => ({
  className: classNames(
    ...(Array.isArray(classNamesArg) ? classNamesArg : [classNamesArg]),
    ...(Array.isArray(classNamesOverride)
      ? classNamesOverride
      : [classNamesOverride]),
  ),
  style: toStyleVars(styleVars),
});

export { createStyle };
