import * as React from "react";
import {DocumentNode} from "graphql"
import AddKambiAppDialog from "./EditKambiAppDialog"
import {graphql} from "react-apollo"
import {Environment, EnvironmentInput, KambiApp, UpdateEnvironmentPayload} from "api/typings";

const updateEnvMutation: DocumentNode = require("./updateEnvMutation.graphql")
const envQuery: DocumentNode = require("environment/environmentQuery.graphql")

interface InputProps {
    app?: KambiApp
    environment: Environment
    onClose: (canceled: boolean) => void
}

interface Response {
    updateEnvironment: {
      environment: Environment
    }
}

const EditKambiAppDialogContainer: React.FC<InputProps> = (props) => {
    return <div></div>
}

export default EditKambiAppDialogContainer

//
// const WrappedFormWithMutation = graphql<Response, InputProps>(updateEnvMutation, {
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
// })(AddKambiAppDialog);
//
// export default WrappedFormWithMutation
