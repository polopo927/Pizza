import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { NotFoundPages } from './pages/404';
import { Main } from './pages/Main';
import './scss/app.scss'
import { Cart } from './pages/Cart';

function App() {



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
