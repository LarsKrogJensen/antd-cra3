import React from "react";
import {DocumentNode} from "graphql"
import {Mutation} from "react-apollo"
import {Environment, EnvironmentInput, KambiApp} from "api/typings";
import {loader} from "graphql.macro";
import EditKambiAppDialog from "./EditKambiAppDialog";

const updateEnvMutation: DocumentNode = loader("./updateEnvMutation.graphql")

interface Props {
    app?: KambiApp
    environment: Environment
    onClose: (canceled: boolean) => void
}

interface Response {
    updateEnvironment: {
        environment: Environment
    }
}

const EditKambiAppDialogContainer: React.FC<Props> = (props) => {
    return (
        <Mutation mutation={updateEnvMutation}>
            {(updateEnv: any) => {
                return <EditKambiAppDialog
                    {...props}
                    onSubmit={(envId: string, envInput: EnvironmentInput) => updateEnv({variables: {input: {environmentId: envId, environment: envInput}}})}
                />
            }}
        </Mutation>
    )
}

export default EditKambiAppDialogContainer
