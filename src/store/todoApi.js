import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['TODOS'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            queryFn: async () => {
                try {
                    const todosRef = collection(db, 'todos');

                    const response = await getDocs(todosRef);

                    const list = response.docs.map((item) => {
                        return { id: item.id, ...item.data() };
                    });

                    return { data: list };
                } catch (e) {
                    return { e };
                }
            },
            providesTags: (result) => {
                if (result) {
                    return [
                        ...result.map(({ id }) => ({
                            type: 'TODOS',
                            id,
                        })),
                        { type: 'TODOS', id: 'LIST' },
                    ];
                } else {
                    return [{ type: 'TODOS', id: 'LIST' }];
                }
            },
        }),
        addTodo: builder.mutation({
            queryFn: async ({ title, completed }) => {
                const todoRef = doc(collection(db, 'todos'));
                await setDoc(todoRef, {
                    title: title,
                    completed: completed,
                });
                return { data: 'ok' };
            },
            invalidatesTags: [{ type: 'TODOS', id: 'LIST' }],
        }),
        deleteTodo: builder.mutation({
            queryFn: async (id) => {
                const todoRef = doc(db, 'todos', id);
                await deleteDoc(todoRef);
                return { data: 'ok' };
            },
            invalidatesTags: [{ type: 'TODOS', id: 'LIST' }],
        }),
        deleteAllTodo: builder.mutation({
            queryFn: async (id) => {
                const todosRef = collection(db, 'todos');

                const response = await getDocs(todosRef);

                response.docs.map((item) => deleteDoc(doc(db, 'todos', item.id)));
                return { data: 'ok' };
            },
            invalidatesTags: [{ type: 'TODOS', id: 'LIST' }],
        }),
        updateTodo: builder.mutation({
            queryFn: async ({ id, data }) => {
                const todoRef = doc(db, 'todos', id);
                await updateDoc(todoRef, { ...data });
                return { data: 'ok' };
            },
        }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useDeleteAllTodoMutation,
} = todosApi;
