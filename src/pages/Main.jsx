import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaCard } from "../components/pizzaCard";
import Skeleton from "../components/pizzaCard/SkeletonPizza";

export const Main = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://66965e360312447373c2421d.mockapi.io/pizzas')
      .then(res => res.json()) // приходит массив arr
      .then((arr) => {
        setPizzas(arr)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map(pizza => <PizzaCard key={pizza.id} {...pizza} />)
        }
      </div>
    </>
  )
}