import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchStatus: false,
        searchItem: '',
    },
    reducers: {
        setSearch: (state, action) => {
            if (!action.payload) {
                state.searchItem = action.payload;
                state.searchStatus = false;
                return;
            }
            state.searchItem = action.payload;
            state.searchStatus = true;
        },
    },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
