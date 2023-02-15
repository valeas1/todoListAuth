import React, { useEffect, useState } from 'react';

import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { privatRouter, publicRouter } from './routes/routes';

import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './store/userSlice';

import { Spinner, Box } from '@chakra-ui/react';

function App() {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const loadingStatus = useSelector((state) => state.user.loading);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (loadingStatus === 'error') {
            setIsLoading(false);
        } else if (loadingStatus === 'done') {
            setIsLoading(false);
        }
    }, [loadingStatus]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" pt="40px">
                <Spinner thickness="4px" speed="0.5s" size="xl" color="#79C6C6" />
            </Box>
        );
    } else {
        return (
            <RouterProvider
                router={
                    loadingStatus === 'done' ? createBrowserRouter(privatRouter) : createBrowserRouter(publicRouter)
                }
            />
        );
    }
}

export default App;
