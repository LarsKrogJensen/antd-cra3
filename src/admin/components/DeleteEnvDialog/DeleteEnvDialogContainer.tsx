import * as React from "react";
import {DocumentNode} from "graphql"
import DeleteEnvDialog from "./DeleteEnvDialog"
import {graphql} from "react-apollo"
import {Environment} from "api/typings";
import {loader} from "graphql.macro";

// const deleteEnvMutation: DocumentNode = loader("./deleteEnvMutation.graphql")
// const environmentsQuery: DocumentNode = loader("app/AppHeader/environmentsQuery.graphql")
// const envQuery: DocumentNode = loader("environment/environmentQuery.graphql")

interface DeleteEnvDialogProps {
    environment: Environment,
    onClose: (canceled: boolean) => void
}

interface Response {
    deleteEnvironment: {
      environment: Environment
    }
}
const DeleteEnvDialogContainer: React.FC<DeleteEnvDialogProps> = (props) => {
    return <div></div>
}

export default DeleteEnvDialogContainer

// const WrappedFormWithData = graphql<Response, DeleteEnvDialogProps>(deleteEnvMutation, {
//     props: ({mutate}) => ({
//         submit: (id: string) => {
//             return mutate && mutate({
//                 update: (store, result: any) => {
//                     // Read the data from our cache for this query.
//                     const data: any = store.readQuery({query: environmentsQuery});
//                     // Add our comment from the mutation to the end.
//                     const deletedEnv: Environment = result.data.deleteEnvironment.environment;
//                     if (deletedEnv) {
//                         const indexOf = data.environments.indexOf(data.environments.find(env => env.id === deletedEnv.id));
//                         if (indexOf > -1) {
//                             data.environments.splice(indexOf, 1);
//                             // Write our data back to the cache.
//                             store.writeQuery({query: environmentsQuery, data});
//                         }
//                     }
//                     store.writeQuery({query: envQuery, variables: {id}, data: {environment: null}})
//                 },
//                 variables: {input: {environmentId: id}}
//             });
//         },
//     }),
// })(DeleteEnvDialog);
//
// export default WrappedFormWithData
