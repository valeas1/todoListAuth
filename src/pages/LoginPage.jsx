import React from 'react';

import { Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

import { createBrowserHistory } from 'history';

const signinSchema = yup.object().shape({
    email: yup.string().required('The field is required!'),
    pass: yup.string().required('The field is required!'),
});

const LoginPage = () => {
    const dispath = useDispatch();

    const history = createBrowserHistory();

    const loginHandler = (email, pass) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, pass).then(({ user }) => {
            dispath(
                setUser({
                    email: user.email,
                    token: user.accessToken,
                    id: user.uid,
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
                        pass: '',
                    }}
                    onSubmit={({ email, pass }) => {
                        loginHandler(email, pass);
                    }}
                    validationSchema={signinSchema}
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
                                    Sign In
                                </Button>
                                <Link to="/registration">
                                    <Button colorScheme="teal" width="100%">
                                        Sign up
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

export default LoginPage;
