import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/Router';
import './styles/main.scss';
import './styles/viewport.scss';
import logo from './images/home_preview_03.png'; 

function App() {
  return (
    <BrowserRouter>
      <div className="all_container">
        <div className="left">
          <p>예술의 전당-</p>
        </div>
        <div className="right">
          <p>-공연을 한눈에!</p>
        </div>
        <img src={logo} alt="공연본당 로고 이미지" />
      </div>
      <div className="container">
          <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
