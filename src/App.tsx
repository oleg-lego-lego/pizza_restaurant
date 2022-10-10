import React from 'react';
import './scss/app.scss';
import {Header} from "./components/Header/Header";
import {Categories} from "./components/Categories/Categories";
import {Sort} from "./components/Sort/Sort";
import {PizzaBlock} from "./components/PizzaBlock/PizzaBlock";
import {pizzas} from "./assets/pizzas"


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzas.map(obj => (
                            <PizzaBlock title={obj.title} price={obj.price} imageUrl={obj.imageUrl}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
