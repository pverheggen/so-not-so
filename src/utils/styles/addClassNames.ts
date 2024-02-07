import { IStyleProps } from '.';

export const addClassNames = (
  classNamesArg: classNames.Argument | classNames.ArgumentArray,
  s?: IStyleProps,
): IStyleProps => {
  const { classNames = [] } = s ?? {};
  const classNamesArray = Array.isArray(classNames) ? classNames : [classNames];
  const classNamesArgArray = Array.isArray(classNamesArg)
    ? classNamesArg
    : [classNamesArg];
  return {
    ...s,
    classNames: [...classNamesArray, ...classNamesArgArray],
  };
};
