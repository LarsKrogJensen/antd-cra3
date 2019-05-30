import React from "react";
import {DocumentNode} from "graphql"
import DeleteAppDialog from "./DeleteAppDialog"
import {graphql} from "react-apollo"
import {Environment, EnvironmentInput, KambiApp, SystemApp, UpdateEnvironmentPayload} from "api/typings";
import {loader} from "graphql.macro";

// const updateEnvMutation: DocumentNode = loader("../EditKambiAppDialog/updateEnvMutation.graphql")
// const envQuery: DocumentNode = loader("environment/environmentQuery.graphql")

interface DeleteAppDialogProps {
    environment: Environment,
    app: KambiApp | SystemApp,
    onClose: (canceled: boolean) => void
}

interface Response {
    updateEnvironment: {
      environment: Environment
    }
}

const DeleteAppDialogContainer: React.FC<DeleteAppDialogProps> = props => {
    return <div></div>
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
