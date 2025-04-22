import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/Router';
import './styles/main.scss';
import './styles/viewport.scss';
import logo from './images/home_preview_02.png'; 

function App() {
  return (
    <BrowserRouter>
      <div className="bg_title">
        <img src={logo} alt="공연본당 로고" />
        <div>예술의 전당을 한눈에!</div>
        <div className="slogan">공연본당</div>
      </div>
      <div className="container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
