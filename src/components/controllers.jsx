import React, { useRef } from 'react';
import { useAddTodoMutation, useDeleteAllTodoMutation } from '../store/todoApi';
import { useDispatch } from 'react-redux';
import { setSearch } from '../store/searchSlice';
import { removeUser } from '../store/userSlice';
import { Flex, Input, Button } from '@chakra-ui/react';

import { getAuth, signOut } from 'firebase/auth';
import { createBrowserHistory } from 'history';

const Controllers = () => {
    const dispatch = useDispatch();

    const inputTodoRef = useRef();
    const inputSerachRef = useRef();

    const [addTodo] = useAddTodoMutation();
    const [deleteAllTodo] = useDeleteAllTodoMutation();

    const handleAddTodo = () => {
        if (inputTodoRef.current.value.trim() === '') {
            return;
        }
        addTodo({ title: inputTodoRef.current.value, completed: false });
        inputTodoRef.current.value = '';
    };

    const handleRemoveAllTodo = () => {
        deleteAllTodo();
    };

    const handleSearchTodo = () => {
        if (!inputSerachRef.current.value.trim()) {
            dispatch(setSearch(''));
        }
        dispatch(setSearch(inputSerachRef.current.value));
        inputSerachRef.current.value = '';
    };

    const handleLogout = () => {
        const auth = getAuth();
        const history = createBrowserHistory();

        signOut(auth);

        dispatch(removeUser());
        history.push('/');
    };

    return (
        <Flex justify="space-around" mb="40px" gap="5px">
            <Flex gap="5px">
                <Input focusBorderColor="#79C6C6" type="text" placeholder="Enter todo..." ref={inputTodoRef} />
                <Button colorScheme="teal" variant="outline" onClick={handleAddTodo}>
                    Add
                </Button>
                <Button px="25" colorScheme="teal" variant="outline" onClick={handleRemoveAllTodo}>
                    Remove all
                </Button>
            </Flex>
            <Flex gap="5px">
                <Input focusBorderColor="#79C6C6" type="text" placeholder="Search..." ref={inputSerachRef} />
                <Button colorScheme="teal" variant="outline" onClick={handleSearchTodo}>
                    Search
                </Button>
            </Flex>
            <Button colorScheme="teal" marginLeft="auto" onClick={handleLogout}>
                LogOut
            </Button>
        </Flex>
    );
};

export default Controllers;
