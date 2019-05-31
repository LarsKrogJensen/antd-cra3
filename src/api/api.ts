import {API_URL} from "./config"
import {RetryLink} from "apollo-link-retry";
import {HttpLink} from "apollo-link-http";
import {ApolloLink} from 'apollo-link'
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client/ApolloClient";
import {onError} from "apollo-link-error";

const retryLink = new RetryLink({
    delay: {
        initial: 3000,
        max: 5000,
        jitter: false
    },
    attempts: {
        max: Infinity,
        retryIf: (error, operation) => {
            // dont retry mutations
            return !!error && operation.query.definitions.every((value:any) => value.operation !== "mutation")
        }
    }
})
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
        console.log(`[Network error]: ${networkError}`);
    }
});

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, retryLink, httpLink])
})

export default apolloClient
