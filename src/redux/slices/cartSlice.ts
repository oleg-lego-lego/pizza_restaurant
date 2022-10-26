import {createSlice} from '@reduxjs/toolkit'

export interface initialStateType {
    totalPrice: number,
    items: any, // fixed
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
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj: any)=> obj.id !== action.payload) // fixed
        },
        clearItems(state, action) {
            state.items = []
        },
    }
})

export const {addItem, removeItem, clearItems} = cartSlice.actions

export default cartSlice.reducer;



