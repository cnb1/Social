import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation} from '@apollo/client';

function Register() {

    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value });
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result);
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault();

    }


    return (
        <div>
            <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                    label='username'
                    placeholder='Username..'
                    name='username'
                    value={values.username}
                    onChange={onChange}
                />

                <Form.Input
                    label='email'
                    placeholder='Email..'
                    name='email'
                    value={values.email}
                    onChange={onChange}
                />

                <Form.Input
                    label='password'
                    placeholder='Password..'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                />

                <Form.Input
                    label='confirm password'
                    placeholder='Confirm password..'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={onChange}
                />

                <Button type='submit' primary>
                    Register
                </Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`

export default Register;