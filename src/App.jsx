import React from 'react';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { NotFoundPages } from './pages/404';
import { Main } from './pages/Main';
import './scss/app.scss'
import { Cart } from './pages/Cart';
import { useState } from 'react';

export const SearchContext = React.createContext()

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Main searchValue={searchValue} />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPages />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
