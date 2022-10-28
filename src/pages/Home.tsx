import React from 'react';
import {Categories} from "../components/Categories/Categories";
import {list, Sort} from "../components/Sort/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {AppContext} from "../components/Context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice'
import {fetchPizzas} from '../redux/slices/pizzaSlice'
import qs from 'qs'
import {useNavigate} from 'react-router-dom'


export const Home = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const {categoryId, sort, currentPage} = useSelector((state: RootState) => state.filter)
    const {items, status} = useSelector((state: RootState) => state.pizza)

    const {searchValue} = React.useContext(AppContext)

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(fetchPizzas({sortBy, order, category, search, currentPage}))
    }

    React.useEffect(() => {
        getPizzas()

        isSearch.current = false
        window.scrollTo(0, 0)
    }, [
        //categoryId, sort.sortProperty, searchValue, currentPage
    ])

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({...params, sort}))
            isSearch.current = true
        }
    }, [])


    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    const pizzas = items
        //.filter(val => val.title.toLowerCase().includes(props.searchValue.toLowerCase()))
        .map((obj, i) => (
            <PizzaBlock
                id={obj.id}
                key={i}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
            />
        ))

    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
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

            {status === 'error' ? (
                <div className={"content__error__info"}>
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                       К сожелению, не удалось получить пиццы. Попробуйте повторить попытку позже.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

