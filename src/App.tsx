import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/router';
import Header from '~views/admin/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
