import { Router } from 'components/Router';
import { RouterProvider } from 'contexts';
import classes from 'App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </div>
  );
}

export default App;
