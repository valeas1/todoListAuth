import React from 'react';
import Controllers from '../components/controllers';
import TodoList from '../components/TodoList';
import { Container } from '@chakra-ui/react';

const TodolistPage = () => {
    return (
        <Container maxW="1200px" pt="15px">
            <Controllers />
            <TodoList />
        </Container>
    );
};

export default TodolistPage;
