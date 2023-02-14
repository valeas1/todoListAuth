import React, { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { privatRouter, publicRouter } from './routes/routes';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        email: user.email,
                        token: user.accessToken,
                        id: user.uid,
                    })
                );
            }
        });
    }, []);

    const authStatus = useSelector((state) => state.user.email);

    const router = authStatus ? createBrowserRouter(privatRouter) : createBrowserRouter(publicRouter);

    return <RouterProvider router={router} />;
}

export default App;
