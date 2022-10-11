import React, {useEffect, useState} from 'react';
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PizzasType} from "../assets/pizzas";

export const Home = () => {
    const [items, setItems] = useState<PizzasType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://63441c93b9ab4243cadfc069.mockapi.io/items')
            .then(res => res.json())
            .then(arr =>  {
                setItems(arr)
                setIsLoading(false)
            })

    }, [])

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                    : items.map((obj, i) => (
                        <PizzaBlock
                            key={i}
                            title={obj.title}
                            price={obj.price}
                            imageUrl={obj.imageUrl}
                            sizes={obj.sizes}
                            types={obj.types}
                        />
                    ))
                }
            </div>
        </>
    );
};

