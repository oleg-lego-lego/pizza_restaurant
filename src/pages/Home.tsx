import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PizzasType} from "../assets/pizzas";
import {Pagination} from "../components/Pagination/Pagination";
import {AppContext} from "../components/Context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setCategoryId, setCurrentPage} from '../redux/slices/filterSlice'


export const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort, currentPage} = useSelector((state: RootState) => state.filter)

    const {searchValue} = React.useContext(AppContext)

    const [items, setItems] = useState<PizzasType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    useEffect(() => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        axios.get(`https://63441c93b9ab4243cadfc069.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })

        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items
        //.filter(val => val.title.toLowerCase().includes(props.searchValue.toLowerCase()))
        .map((obj, i) => (
            <PizzaBlock
                key={i}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
            />
        ))

    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={(id) => onChangeCategory(id)}
                />

                <Sort/>

            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

