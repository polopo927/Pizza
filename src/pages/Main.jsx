import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaCard } from "../components/pizzaCard";
import Skeleton from "../components/pizzaCard/SkeletonPizza";
import { Pagination } from "../pagination";
import { SearchContext } from "../App";

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

export const Main = () => {
  const { searchValue } = useContext(SearchContext)
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const dispatch = useDispatch()
  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const sortType = sort.sortProperty



  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }


  const url = `https://66965e360312447373c2421d.mockapi.io/pizzas?page=${currentPage}&limit=4`
  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const search = searchValue ? `&search=${searchValue}` : ''
  const sortBy = `&sortBy=${sortType}&order=desc`

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
      axios
      .get(`${url}${category}${sortBy}${search}`)
      .then(response => {
        setPizzas(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setIsError(true)
          setIsLoading(false)
        } else {
          console.log('Произошла ошибка, пицца не найдена', error)
        }
      })
    window.scroll(0, 0)
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage])

  const items = isError 
  ? <p>Пиццы не найдено</p> 
  : pizzas.length > 0 
    ? pizzas.map(pizza => <PizzaCard key={pizza.id} {...pizza} />) 
    : null;

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : items
        }
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}