import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/Router';
import './styles/main.scss';
import './styles/viewport.scss';
import logo from './images/home_preview_02.png'; 

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="left">예술의 전당</div>
        <div className="right">공연을 한눈에!</div>
        <img src={logo} alt="공연본당 로고" />
      </div>

      <div className="container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
