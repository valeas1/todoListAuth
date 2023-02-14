import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './todoApi';
import searchSlice from './searchSlice';
import userSlice from './userSlice';

export default configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer,
        search: searchSlice,
        user: userSlice,
    },
    middleware: (getDeaultMiddleware) => {
        return getDeaultMiddleware().concat(todosApi.middleware);
    },
});
