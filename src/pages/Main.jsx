import React, { useEffect, useRef } from "react";
import qs from 'qs'

import { useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories";
import { Sort, sortLists } from "../components/Sort";
import { PizzaCard } from "../components/pizzaCard";
import Skeleton from "../components/pizzaCard/SkeletonPizza";
import { Pagination } from "../pagination";

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { categoryId, sort, currentPage, searchValue } = useSelector(state => state.filter)
  const sortType = sort.sortProperty
  const { pizzas, status } = useSelector(state => state.pizza)

  const getPizzas = async () => {
    const url = `https://66965e360312447373c2421d.mockapi.io/pizzas?page=${currentPage}&limit=4&`
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const sortBy = `&sortBy=${sortType}&order=desc`

    dispatch(fetchPizzas({
      url,
      category,
      search,
      sortBy
    }))

  }

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortLists.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
     // isSearch.current = true
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
    window.scroll(0, 0)
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
    // eslint-disable-next-line
  }, [categoryId, sortType, currentPage])

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)
  const pizza = pizzas.map(pizza => <PizzaCard key={pizza.id} {...pizza} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ?
        <div>
          <h2>Произошла ошибка при загрузке пицц, попробуйте обновить страницу</h2>
        </div>
        : <div className="content__items">{status === 'loading' ? skeletons : pizza}</div>
      }
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
