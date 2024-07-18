import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaCard } from "../components/pizzaCard";
import Skeleton from "../components/pizzaCard/SkeletonPizza";

export const Main = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'Популярности',
    sortProperty: 'rating'
  })

  const url = 'https://66965e360312447373c2421d.mockapi.io/pizzas?'
  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const sortBy = `&sortBy=${sortType.sortProperty}&order=desc`

  useEffect(() => {
    setIsLoading(true)
    fetch(`${url}${category}${sortBy}`)
      .then(res => res.json()) // приходит массив arr
      .then((arr) => {
        setPizzas(arr)
        setIsLoading(false)
      })
    window.scroll(0, 0)
  }, [categoryId, sortType])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort
          sortType={sortType}
          onChangeType={(index) => setSortType(index)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map(pizza => <PizzaCard key={pizza.id} {...pizza} />)
        }
      </div>
    </div>
  )
}