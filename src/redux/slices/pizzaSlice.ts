import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {PizzasType} from "../../assets/pizzas";
import axios from "axios";

export interface initialStateType {
    items: PizzasType[],
}

export type ParamsType = {
    currentPage: number,
    category: string,
    sortBy: string,
    order: string,
    search: string
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: ParamsType, thunkAPI) => {
        const {category, sortBy, currentPage, order, search} = params
        const {data} = await axios
            .get(`https://63441c93b9ab4243cadfc069.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState: initialStateType = {
    items: []
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },

    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer;



