import { ComponentChildren } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Route, routerContext } from './RouterContext';

export const RouterProvider = ({
  children,
}: {
  children?: ComponentChildren;
}) => {
  const [route, setRoute] = useState<Route>('list');
  const value = useMemo(
    () => ({
      route,
      push: setRoute,
    }),
    [route, setRoute],
  );
  return (
    <routerContext.Provider value={value}>{children}</routerContext.Provider>
  );
};
