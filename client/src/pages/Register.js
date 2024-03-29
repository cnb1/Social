import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';


function Register(props) {

    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();


    const { onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    })


    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }


    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label='username'
                    placeholder='Username..'
                    name='username'
                    type='text'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label='email'
                    placeholder='Email..'
                    name='email'
                    type='text'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label='password'
                    placeholder='Password..'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label='confirm password'
                    placeholder='Confirm password..'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />

                <Button type='submit' primary>
                    Register
                </Button>

                
            </Form>

            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            
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