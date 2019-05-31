import React from "react";
import {DocumentNode} from "graphql"
import {Mutation} from "react-apollo"
import {Environment} from "api/typings";
import {loader} from "graphql.macro";
import CreateEnvDialog from "./CreateEnvDialog";

const createEnvMutation: DocumentNode = loader("./createEnvMutation.graphql")
const environmentsQuery: DocumentNode = loader("../../../app/AppHeader/environmentsQuery.graphql")

interface InputProps {
    onComplete: (createdEnvId?: string) => void
    envToClone?: Environment
}

interface Response {
    createEnvironment: {
        environment: Environment
    }
}

const CreateEnvDialogContainer: React.FC<InputProps> = (props) => {
    return (
        <Mutation
            mutation={createEnvMutation}
            update={updateCache}>
            {(createEnv: any, {data}: any) => {
                return <CreateEnvDialog
                    {...props}
                    onSubmit={(env) => createEnv({variables: {input: {environment: env}}})}
                />
            }}
        </Mutation>
    )
}

function updateCache(cache: any, {data}: any) {
    const {environments} = cache.readQuery({query: environmentsQuery});
    environments.push(data.createEnvironment.environment)
    cache.writeQuery({
        query: environmentsQuery,
        data: {environments},
    });
}

export default CreateEnvDialogContainer

