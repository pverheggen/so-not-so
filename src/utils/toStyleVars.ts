const toStyleVars = (obj?: { [key: string]: string | number }) =>
  obj &&
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${key}`, value]),
  );

export default toStyleVars;
