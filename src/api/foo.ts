import {ApolloLink, NextLink, Operation} from "apollo-link";

const createLogLink = (): ApolloLink =>
    new ApolloLink((operation: Operation, forward: any) =>
        forward(operation).map((result: any) => {
            console.log(result)
            return result;
        })
    );

export default createLogLink;