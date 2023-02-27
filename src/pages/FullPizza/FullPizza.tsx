import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {PizzasType} from "../../assets/pizzas";

export const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<PizzasType>()
    const {id} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://63441c93b9ab4243cadfc069.mockapi.io/items/' + id)
                setPizza(data)
            } catch (e) {
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return (
            <>'Загрузка...'</>
        )
    }

    return (
        <div className={"container"}>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};
