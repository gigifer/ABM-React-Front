import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

// Donde nos conectamos para obtener los datos
const httpLink = createHttpLink({
    uri: 'https://arcane-fortress-20573.herokuapp.com/',
    fetch
});

// Agregamos nuevo header
const authlink = setContext((_, { headers }) =>{

    // Leer el storage almacenado
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});


// Conectamos a apollo client
const client = new ApolloClient ({
    cache: new InMemoryCache(),
    link: authlink.concat(httpLink)
});

export default client;