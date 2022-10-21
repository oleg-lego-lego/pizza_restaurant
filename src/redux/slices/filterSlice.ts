import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface CounterStateType {
    categoryId: number,
    sort: { name: string, sortProperty: string }
}

const initialState: CounterStateType = {
    categoryId: 0,
    sort: {name: 'популярности', sortProperty: 'rating'}
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state: any, action: any) {
            state.categoryId = action.payload
        }
    }
})

export const {setCategoryId} = filterSlice.actions

export default filterSlice.reducer;

//
// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: (state) => {
//             state.value += 1
//         },
//         decrement: (state) => {
//             state.value -= 1
//         },
//         incrementByAmount: (state, action: PayloadAction<number>) => {
//             state.value += action.payload
//         },
//     },
// })
//
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
//
// export default counterSlice.reducer

