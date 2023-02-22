import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {PizzasType} from "../../assets/pizzas";
import axios from "axios";
import {RootState} from "../store";

export interface initialStateType {
    items: PizzasType[],
    status: Status
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
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
    async (params: ParamsType) => {
        const {category, sortBy, currentPage, order, search} = params
        const {data} = await axios
            .get(`https://63441c93b9ab4243cadfc069.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState: initialStateType = {
    items: [],
    status: Status.LOADING,
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
})

export const selectPizzaData = (store: RootState) => store.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer;



