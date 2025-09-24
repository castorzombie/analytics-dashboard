import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://mo-graphql.microapps-staging.com',
  headers: {
    Authorization: 'pk_test_4a140607778e1217f56ccb8b50540f91',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
