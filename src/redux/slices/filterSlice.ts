import {createSlice} from '@reduxjs/toolkit'

export interface initialStateType {
    categoryId: number,
    currentPage: number,
    sort: { name: string, sortProperty: string }
}

const initialState: initialStateType = {
    categoryId: 1,
    currentPage: 1,
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
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        },
    }
})

export const {setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer;



