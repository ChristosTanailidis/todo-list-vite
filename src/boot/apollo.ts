import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error";
import { from } from '@apollo/client';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: '',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(from([errorLink, httpLink])),
  cache : new InMemoryCache(),
})