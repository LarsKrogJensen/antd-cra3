import {API_URL} from "./config"
import {HttpLink} from "apollo-link-http";
import {ApolloLink} from 'apollo-link'
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client/ApolloClient";
import {onError} from "apollo-link-error";

const cache = new InMemoryCache()
const httpLink = new HttpLink({
    uri: API_URL()
})

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path}) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    }
    if (networkError) {
        cache.writeData({data: {isConnected: false}})
        console.log(`[Network error]: ${networkError}`);
    }
});

const apolloClient = new ApolloClient({
    cache: cache,
    link: ApolloLink.from([errorLink, httpLink])
})

export default apolloClient
