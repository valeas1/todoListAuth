import React from 'react';
import { Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { createBrowserHistory } from 'history';

const signupSchema = yup.object().shape({
    email: yup.string().email('Invalid E-mail!').required('The field is required!'),
    fullname: yup.string().min(3, 'Too short!').max(30, 'Too Long!').required('The field is required!'),
    pass: yup.string().min(6, 'Password to short!').required('The field is required!'),
});

const RegistationPage = () => {
    const dispatch = useDispatch();

    const history = createBrowserHistory();

    const signupHandler = ({ email, fullname, pass }) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, pass).then(({ user }) => {
            dispatch(
                setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                })
            );
            history.push('/');
        });
    };
    return (
        <Flex width="100%" height="100vh" justifyContent="center" alignItems="center">
            <Flex
                width="50%"
                height="50%"
                border="2px solid black"
                borderRadius="15px"
                justifyContent="center"
                alignItems="center"
            >
                <Formik
                    initialValues={{
                        email: '',
                        fullname: '',
                        pass: '',
                    }}
                    onSubmit={(values) => {
                        signupHandler(values);
                    }}
                    validationSchema={signupSchema}
                >
                    {(props) => {
                        return (
                            <Form
                                onSubmit={props.handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
                            >
                                <Field name="email">
                                    {({ field, form }) => {
                                        return (
                                            <FormControl>
                                                <FormLabel>E-mail:</FormLabel>
                                                <Input {...field} placeholder="E-mail..."></Input>
                                                <ErrorMessage name="email" component="div" style={{ color: 'red' }}>
                                                    {form.errors.name}
                                                </ErrorMessage>
                                            </FormControl>
                                        );
                                    }}
                                </Field>
                                <Field name="fullname">
                                    {({ field, form }) => {
                                        return (
                                            <FormControl>
                                                <FormLabel>Name:</FormLabel>
                                                <Input {...field} placeholder="Name"></Input>
                                                <ErrorMessage name="fullname" component="div" style={{ color: 'red' }}>
                                                    {form.errors.name}
                                                </ErrorMessage>
                                            </FormControl>
                                        );
                                    }}
                                </Field>
                                <Field name="pass">
                                    {({ field, form }) => {
                                        return (
                                            <FormControl>
                                                <FormLabel>Password:</FormLabel>
                                                <Input {...field} type="password" placeholder="Password"></Input>
                                                <ErrorMessage name="pass" component="div" style={{ color: 'red' }}>
                                                    {form.errors.name}
                                                </ErrorMessage>
                                            </FormControl>
                                        );
                                    }}
                                </Field>
                                <Button type="submit" variant="outline" colorScheme="teal">
                                    Sign Up
                                </Button>
                                <Link to={'/login'}>
                                    <Button colorScheme="teal" width="100%">
                                        Sign In
                                    </Button>
                                </Link>
                            </Form>
                        );
                    }}
                </Formik>
            </Flex>
        </Flex>
    );
};

export default RegistationPage;
