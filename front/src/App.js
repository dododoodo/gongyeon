import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/Router';
import './styles/main.scss';
import './styles/viewport.scss';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
