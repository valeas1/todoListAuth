import React, { useRef, useState } from 'react';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../store/todoApi';
import { ListItem, Button, Input, Checkbox } from '@chakra-ui/react';

const TodoListItem = ({ id, title, completed }) => {
    const [editable, setEditable] = useState(false);

    const [completedItem, setCompletedItem] = useState(completed);

    const [itemTitle, setItemTitle] = useState(title);

    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    const inputRef = useRef();

    const handleRemove = () => {
        deleteTodo(id);
    };

    const handleToggle = () => {
        setEditable(!editable);
    };

    const handleUpdate = () => {
        setItemTitle(inputRef.current.value);
        updateTodo({
            id,
            data: {
                title: inputRef.current.value,
            },
        });
        setEditable(!editable);
    };

    const checkboxHandler = (e) => {
        console.log(e);
        updateTodo({
            id,
            data: {
                completed: !completedItem,
            },
        });
        setCompletedItem(!completedItem);
    };

    if (!editable) {
        return (
            <ListItem display="flex" alignItems="center" my="2px" p="3px" gap="5px">
                <Checkbox
                    colorScheme="cyan"
                    type="checkbox"
                    onChange={checkboxHandler}
                    defaultChecked={completedItem ? true : null}
                />
                <span style={completedItem ? { textDecoration: 'line-through' } : null}>{itemTitle}</span>
                <Button colorScheme="teal" variant="outline" ml="auto" onClick={handleToggle}>
                    Edit
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={handleRemove}>
                    Remove
                </Button>
            </ListItem>
        );
    } else {
        return (
            <ListItem display="flex" alignItems="center" gap="5px" my="2px" p="3px">
                <Input ref={inputRef} focusBorderColor="#79C6C6" defaultValue={title} width="80%" />
                <Button colorScheme="teal" variant="outline" ml="auto" onClick={handleUpdate}>
                    Save
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={handleToggle}>
                    Cancel
                </Button>
            </ListItem>
        );
    }
};

export default TodoListItem;
