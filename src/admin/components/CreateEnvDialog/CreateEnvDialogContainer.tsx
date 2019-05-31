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
            update={(cache:any, {data}: any) => {
                const {environments} = cache.readQuery({query: environmentsQuery});
                environments.push(data.createEnvironment.environment)
                cache.writeQuery({
                    query: environmentsQuery,
                    data: {environments},
                });
            }}
        >
            {
                (createEnv: any, {data}: any) => {
                    console.log(data);
                    return <CreateEnvDialog
                        {...props}
                        onSubmit={(env) => createEnv({variables: {input: {environment: env}}})}
                    />
                }
            }
        </Mutation>
    )
}

export default CreateEnvDialogContainer

// const WrappedFormWithData: React.ComponentClass<InputProps> = graphql<Response, InputProps>(createEnv, {
//     props: ({mutate}) => ({
//         onSubmit: (input: EnvironmentInput) => {
//             return mutate && mutate({
//                 update: (store, result: any) => {
//                     // Read the data from our cache for this query.
//                     const data: any = store.readQuery({query: environments});
//                     // Add our comment from the mutation to the end.
//                     const env: Environment = result.data.createEnvironment.environment;
//                     if (env) {
//                         data.environments.push(env);
//                         // Write our data back to the cache.
//                         store.writeQuery({query: environments, data});
//                     }
//                 },
//                 variables: {input: {environment: input}}
//             }).then(result => {
//                 const env: Environment = result.data.createEnvironment.environment;
//                 return env.id
//             });
//         },
//     }),
// })(CreateEnvDialog);
//
// export default WrappedFormWithData
