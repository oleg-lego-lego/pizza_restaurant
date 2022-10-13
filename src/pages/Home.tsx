import React, {useEffect, useState} from 'react';
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PizzasType} from "../assets/pizzas";
import {Pagination} from "../components/Pagination/Pagination";

type HomePropsType = {
    searchValue: string
}

export const Home = (props: HomePropsType) => {
    const [items, setItems] = useState<PizzasType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({name: 'популярности', sortProperty: 'rating'})
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = props.searchValue ? `&search=${props.searchValue}` : ''

        fetch(`https://63441c93b9ab4243cadfc069.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(arr => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, props.searchValue, currentPage])

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

    return (
        <div className="container">
            <div className="content__top">

                <Categories
                    categoryId={categoryId}
                    onClickCategory={(id) => setCategoryId(id)}
                />

                <Sort
                    sortType={sortType}
                    setSortType={(id) => setSortType(id)}
                />

            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>

            <Pagination currentPage={currentPage} onChangePage={(n) =>setCurrentPage(n)}/>
        </div>
    );
};

