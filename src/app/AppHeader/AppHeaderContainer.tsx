import React from 'react'
import {DocumentNode} from "graphql"
import {Query} from "react-apollo"
import {loader} from "graphql.macro";
import AppHeader from "./AppHeader";

const environmentsQuery: DocumentNode = loader("./environmentsQuery.graphql")

interface Props {
    id: string;
    sideMenuCollapsed: boolean
    onNavigate: (path: string) => void
    onSideMenuCollapse: (collapse: boolean) => void
}

const AppHeaderContainer: React.FC<Props> = (props) => {
    return (
        <Query query={environmentsQuery} pollInterval={5000}>
            {({loading, error, data}: any) => {
                return <AppHeader {...props}
                                  loading={loading}
                                  environments={data.environments}
                                  error={error && error.message}/>
            }}
        </Query>
    )
}

export default AppHeaderContainer

