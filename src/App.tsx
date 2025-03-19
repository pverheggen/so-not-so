import { Router } from 'components/Router';
import { RouterProvider } from 'contexts';

function App() {
  return (
    <div className="app">
      <RouterProvider>
        <Router />
      </RouterProvider>
    </div>
  );
}

export default App;
