import React from "react"
import {Query} from "react-apollo"
import {Environment} from "api/typings"
import {EnvActionDelegate} from "./envActionDelegate"
import {loader} from 'graphql.macro'
import {DocumentNode} from "graphql";
import EnvPage from "environment/EnvPage";

const environmentQuery: DocumentNode = loader("./environmentQuery.graphql")

interface Props {
    id: string;
    sideMenuCollapsed: boolean;
    actionDelegate: EnvActionDelegate;
}

interface EnvResponse {
    environment?: Environment;
}

const EnvContainer: React.FC<Props> = ({id, ...rest}) => {
    return (
        <Query<EnvResponse> query={environmentQuery} variables={{id}}>
            {({networkStatus, error, data}) => {
                return <EnvPage {...rest}
                                loading={networkStatus === 1}
                                environment={data && data.environment}
                                error={error ? error.message : undefined}/>
            }}
        </Query>
    )
}

export default EnvContainer
