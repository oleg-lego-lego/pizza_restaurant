import {createSlice} from '@reduxjs/toolkit'
import {PizzasType} from "../../assets/pizzas";

export interface initialStateType {
    totalPrice: number,
    items: PizzasType[],
}

const initialState: initialStateType = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
        },
    }
})

export const {addItem, removeItem, clearItems} = cartSlice.actions

export default cartSlice.reducer;



