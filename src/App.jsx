import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaCard } from './components/PizzaCard';
import { Sort } from './components/Sort';
import './scss/app.scss'
import { useEffect, useState } from 'react';

function App() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('https://66965e360312447373c2421d.mockapi.io/pizzas')
      .then(res => res.json()) // приходит массив arr
      .then((arr) => {
        setPizzas(arr)
        console.log(arr)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) =>
              <PizzaCard
                key={pizza.id}
                {...pizza} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
