import * as React from "react";
import {DocumentNode} from "graphql"
import {Mutation, Query} from "react-apollo"
import {Environment, EnvironmentInput, SystemApp} from "api/typings";
import {loader} from "graphql.macro";
import EditSystemAppDialog from "./EditSystemAppDialog";

const updateEnvMutation: DocumentNode = loader("../EditKambiAppDialog/updateEnvMutation.graphql")
const systemAppConfigQuery: DocumentNode = loader("./systemAppConfigQuery.graphql");

interface InputProps {
    app?: SystemApp
    environment: Environment
    onClose: (canceled: boolean) => void
}

const EditSystemAppDialogContainer: React.FC<InputProps> = (props) => {
    return (
        <Query query={systemAppConfigQuery}>
            {({loading, data}: any) => {
                return (
                    <Mutation mutation={updateEnvMutation}>
                        {(updateEnv: any) => {
                            return (
                                <EditSystemAppDialog
                                    {...props}
                                    loading={loading}
                                    systemAppConfig={data.systemAppConfig}
                                    onSubmit={(envId: string, envInput: EnvironmentInput) => updateEnv({
                                        variables: {
                                            input: {
                                                environmentId: envId,
                                                environment: envInput
                                            }
                                        }
                                    })}
                                />
                            )
                        }}
                    </Mutation>
                )
            }}
        </Query>
    )
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
