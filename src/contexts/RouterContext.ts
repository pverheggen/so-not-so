import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export type Route = 'play' | 'list';

export interface RouterContext {
  route: Route;
  push: (route: Route) => void;
}

export const routerContext = createContext<RouterContext>({
  route: 'list',
  push: () => {},
});

export const useRouter = () => useContext(routerContext);
