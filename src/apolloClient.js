import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',//GraphQL API endpoint
    cache: new InMemoryCache(),// Initialize an in-memory cache for efficient data retrieval
});

export default client;
