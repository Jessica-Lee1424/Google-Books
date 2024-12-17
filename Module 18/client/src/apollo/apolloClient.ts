import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3001/graphql', // Update with your server's URL
    }),
    cache: new InMemoryCache(),
});

export default client;