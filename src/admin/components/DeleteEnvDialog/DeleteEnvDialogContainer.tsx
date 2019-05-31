import * as React from "react";
import {Mutation} from "react-apollo"
import {Environment} from "api/typings";
import {loader} from "graphql.macro";
import {DocumentNode} from "graphql";
import DeleteEnvironmentDialog from "admin/components/DeleteEnvDialog/DeleteEnvDialog";

const deleteEnvMutation: DocumentNode = loader("./deleteEnvMutation.graphql")
const environmentsQuery: DocumentNode = loader("../../../app/AppHeader/environmentsQuery.graphql")
const envQuery: DocumentNode = loader("../../../environment/environmentQuery.graphql")

interface Props {
    environment: Environment,
    onClose: (canceled: boolean) => void
}

interface Response {
    deleteEnvironment: {
        environment: Environment
    }
}

const DeleteEnvDialogContainer: React.FC<Props> = (props) => {
    return (
        <Mutation
            mutation={deleteEnvMutation}
            update={updateCache}>
            {
                (deleteEnv: any) => {
                    return <DeleteEnvironmentDialog
                        {...props}
                        submit={id => deleteEnv({variables: {input: {environment_id: id}}})}
                    />
                }
            }
        </Mutation>
    )
}

function updateCache(cache: any, {data}: any) {

    const deletedEnv: Environment = data.deleteEnvironment.environment;
    if (deletedEnv) {
        // first update 'environments' query that holds all available environments
        // used in app header drop down
        const environments: Environment[] = cache.readQuery({query: environmentsQuery}).environments;
        const index = environments.findIndex(env => env.id === deletedEnv.id);
        if (index > -1) {
            environments.splice(index, 1)
            cache.writeQuery({
                query: environmentsQuery,
                data: {environments},
            });
        }

        // then delete the actual environment instance
        cache.writeQuery({query: envQuery, variables: {id: deletedEnv.id}, data: {environment: null}})
    }
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
