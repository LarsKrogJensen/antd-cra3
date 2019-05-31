import React from "react";
import {DocumentNode} from "graphql"
import {Mutation} from "react-apollo"
import {Environment, EnvironmentInput, KambiApp, SystemApp} from "api/typings";
import {loader} from "graphql.macro";
import DeleteAppDialog from "./DeleteAppDialog";

const updateEnvMutation: DocumentNode = loader("../EditKambiAppDialog/updateEnvMutation.graphql")

// const envQuery: DocumentNode = loader("environment/environmentQuery.graphql")

interface Props {
    environment: Environment,
    app: KambiApp | SystemApp,
    onClose: (canceled: boolean) => void
}

interface Response {
    updateEnvironment: {
        environment: Environment
    }
}

const DeleteAppDialogContainer: React.FC<Props> = props => {
    return (
        <Mutation mutation={updateEnvMutation}>
            {(updateEnv: any) => {
                return (
                    <DeleteAppDialog
                        {...props}
                        onSubmit={(id: string, envInput: EnvironmentInput) => updateEnv({
                            variables: {
                                input: {
                                    environmentId: id,
                                    environment: envInput
                                }
                            }
                        })}
                    />
                )
            }}
        </Mutation>
    )
}

export default DeleteAppDialogContainer

// const WrappedWithMutation = graphql<Response, DeleteAppDialogProps>(updateEnvMutation, {
//     props: ({mutate}) => ({
//         onSubmit: (envId: string, input: EnvironmentInput) => {
//             return mutate && mutate({
//                 update: (store, result: any) => {
//                     const payload: UpdateEnvironmentPayload = result.data.updateEnvironment
//                     store.writeQuery({query: envQuery, variables: {id: envId}, data: payload})
//                 },
//                 variables: {input: {environmentId: envId, environment: input}}
//             });
//         },
//     }),
// })(DeleteAppDialog);
//
// export default WrappedWithMutation
