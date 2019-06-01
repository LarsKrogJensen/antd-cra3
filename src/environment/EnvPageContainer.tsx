import React from "react"
import {Query} from "react-apollo"
import {Environment} from "api/typings"
import {EnvActionDelegate} from "./envActionDelegate"
import {loader} from 'graphql.macro'
import {DocumentNode} from "graphql";
import EnvPage from "environment/EnvPage";
import Polly from "components/Polly";

const environmentQuery: DocumentNode = loader("./environmentQuery.graphql")

interface Props {
    id: string;
    sideMenuCollapsed: boolean;
    actionDelegate: EnvActionDelegate;
}

interface Response {
    environment?: Environment;
}

interface Variables {
    id: string
}

const EnvContainer: React.FC<Props> = ({id, ...rest}) => {
    return (
        <Query<Response, Variables> query={environmentQuery} variables={{id}}>
            {({networkStatus, error, data, refetch}) => {
                return (
                    <Polly refetch={refetch} interval={5000}>
                        <EnvPage {...rest}
                                 loading={networkStatus === 1}
                                 environment={data && data.environment}
                                 error={error ? error.message : undefined}/>
                    </Polly>
                )
            }}
        </Query>
    )
}

export default EnvContainer
