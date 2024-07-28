import React, { useContext, useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaCard } from "../components/pizzaCard";
import Skeleton from "../components/pizzaCard/SkeletonPizza";
import { Pagination } from "../pagination";
import { SearchContext } from "../App";

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

export const Main = () => {
  const { searchValue } = useContext(SearchContext)
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  const { categoryId, sort } = useSelector(state => state.filter)
  const sortType = sort.sortProperty

  const url = `https://66965e360312447373c2421d.mockapi.io/pizzas?page=${currentPage}&limit=4&`
  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const search = searchValue ? `&search=${searchValue}` : ''
  const sortBy = `&sortBy=${sortType}&order=desc`

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }


  useEffect(() => {
    setIsLoading(true)
    fetch(`${url}${category}${sortBy}${search}`)
      .then(res => res.json()) // приходит массив arr
      .then((data) => {
        if (Array.isArray(data)) {
          setPizzas(data)
        } else {
          setPizzas([])
        }
        setIsLoading(false)
      })
    window.scroll(0, 0)
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage])

  const items = pizzas.length > 0
    ? pizzas.map(pizza => <PizzaCard key={pizza.id} {...pizza} />)
    : <p>Пиццы не найдено</p>

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort
          
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : items
        }
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  )
}