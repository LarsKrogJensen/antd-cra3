import * as React from "react";
import {DocumentNode} from "graphql"
import AddSystemAppDialog from "./EditSystemAppDialog"
import {graphql, OptionProps, QueryProps} from "react-apollo"
import {
    Environment, EnvironmentInput, SystemApp, SystemAppConfig,
    UpdateEnvironmentPayload
} from "api/typings";
import {loader} from "graphql.macro";

// const updateEnvMutation: DocumentNode = loader("../EditKambiAppDialog/updateEnvMutation.graphql")
// const systemAppConfigQuery: DocumentNode = loader("./systemAppConfigQuery.graphql");
// const envQuery: DocumentNode = loader("environment/environmentQuery.graphql")

interface InputProps {
    app?: SystemApp
    environment: Environment
    onClose: (canceled: boolean) => void
}


const EditSystemAppDialogContainer: React.FC<InputProps> = (props) => {
    return <div></div>
}

export default EditSystemAppDialogContainer

// interface MutationResponse {
//     updateEnvironment: {
//         environment: Environment
//     }
// }
//
// interface QueryInputProps extends InputProps {
//     onSubmit: (envId: string, env: EnvironmentInput) => Promise<any>
// }
//
// interface QueryResponse {
//     systemAppConfig: SystemAppConfig[]
// }
//
// type MergedQueryOutputProps = QueryResponse & QueryProps & QueryInputProps
//
// const WrappedWithDasAlles = graphql<MutationResponse, InputProps>(updateEnvMutation, {
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
// })(props => {
//     const WrappedWithData = graphql<QueryResponse, InputProps, MergedQueryOutputProps>(
//         systemAppConfigQuery,
//         {
//             options: (p) => ({
//                 fetchPolicy: "cache-and-network",
//                 notifyOnNetworkStatusChange: false
//             }),
//             props: (dataProps: OptionProps<QueryInputProps, QueryResponse>) => ( {
//                 ...dataProps.ownProps,
//                 ...dataProps.data
//             })
//         })(dataProps => <AddSystemAppDialog {...props} {...dataProps}/>)
//
//     return <WrappedWithData {...props}/>
// });
//
// export default WrappedWithDasAlles
