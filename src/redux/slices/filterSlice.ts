import {createSlice} from '@reduxjs/toolkit'

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
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        }
    }
})

export const {setCategoryId, setSort} = filterSlice.actions

export default filterSlice.reducer;



