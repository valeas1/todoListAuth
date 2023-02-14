import TodolistPage from '../pages/TodolistPage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import RegistrationPage from '../pages/RegistaretionPage';

import { redirect } from 'react-router-dom';

export const privatRouter = [
    {
        path: '/',
        element: <TodolistPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        loader: () => redirect('/'),
    },
];

export const publicRouter = [
    {
        path: '/',
        loader: () => redirect('/login'),
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/registration',
        element: <RegistrationPage />,
    },
];
