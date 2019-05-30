import React from "react";
import {DocumentNode} from "graphql"
import CreateEnvDialog from "./CreateEnvDialog"
import {graphql} from "react-apollo"
import {Environment, EnvironmentInput} from "api/typings";
import {loader} from "graphql.macro";

// const createEnv: DocumentNode = loader("./createEnvMutation.graphql")
// const environments: DocumentNode = loader("app/AppHeader/environmentsQuery.graphql")

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
    return <div></div>
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
