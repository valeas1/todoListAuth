import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const getUser = createAsyncThunk('user/getUser', async (_, { dispatch }) => {
    const auth = getAuth();

    await onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(
                setUser({
                    email: user.email,
                    token: user.accessToken,
                    id: user.uid,
                })
            );
            dispatch(setLoadingStatus('done'));
        } else {
            dispatch(setLoadingStatus('error'));
        }
    });
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            email: null,
            id: null,
            token: null,
        },
        loading: 'loading',
    },
    reducers: {
        setUser(state, action) {
            state.user.email = action.payload.email;
            state.user.token = action.payload.token;
            state.user.id = action.payload.id;
        },
        removeUser(state) {
            state.user.email = null;
            state.user.token = null;
            state.user.id = null;
        },
        setLoadingStatus(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setUser, removeUser, setLoadingStatus } = userSlice.actions;

export default userSlice.reducer;
