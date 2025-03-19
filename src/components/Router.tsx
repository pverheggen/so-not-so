import { useRouter } from 'contexts';
import { List, Play } from './pages';

export const Router = () => {
  const { route } = useRouter();
  switch (route) {
    case 'list':
      return <List />;
    case 'play':
      return <Play />;
    default:
      return null;
  }
};
