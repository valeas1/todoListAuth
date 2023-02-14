import React from 'react';
import TodoListItem from './TodoListItem';
import { useGetTodosQuery } from '../store/todoApi';
import { useSelector } from 'react-redux';
import { Spinner, Box, List } from '@chakra-ui/react';

const TodoList = () => {
    const { data, isLoading } = useGetTodosQuery();
    const searchStatus = useSelector((state) => state.search.searchStatus);
    const searchItem = useSelector((state) => state.search.searchItem);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" pt="40px">
                <Spinner thickness="4px" speed="0.5s" size="xl" color="#79C6C6" />
            </Box>
        );
    } else {
        if (searchStatus) {
            return (
                <List>
                    {data
                        .filter((item) => item.title.includes(searchItem))
                        .map((item) => (
                            <TodoListItem key={item.id} id={item.id} title={item.title} completed={item.completed} />
                        ))}
                </List>
            );
        } else {
            return (
                <List>
                    {data.map((item) => (
                        <TodoListItem key={item.id} id={item.id} title={item.title} completed={item.completed} />
                    ))}
                </List>
            );
        }
    }
};

export default TodoList;
