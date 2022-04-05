import React from 'react';
import App from './App';
import {ApolloClient} from '@apollo/client';
import {InMemoryCache} from '@apollo/client';
import {createHttpLink} from '@apollo/client';
import {ApolloProvider} from '@apollo/client';


const httplink = createHttpLink({
    uri: 'http://localhost:3001'
})

const client = new ApolloClient({
    link: httplink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)