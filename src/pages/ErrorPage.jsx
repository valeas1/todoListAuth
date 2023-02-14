import { Flex, Alert, AlertTitle } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <Flex width="100%" height="100vh" flexDirection="column" justifyContent="center" alignItems="center">
            <Alert
                width="50%"
                height="50%"
                status="error"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <AlertTitle>Ooops!</AlertTitle>
                <p>Page is not found!</p>
                <p style={{ color: 'blue', textDecoration: 'underline' }}>
                    <Link to="/">Return to app.</Link>
                </p>
            </Alert>
        </Flex>
    );
};

export default ErrorPage;
