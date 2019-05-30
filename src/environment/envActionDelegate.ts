import {Environment, KambiApp, SystemApp} from "api/typings";

export interface EnvActionDelegate {
    onCreateEnv: () => void
    onCloneEnv: (environment: Environment) => void
    onDeleteEnv: (environment?: Environment) => void
    onAddKambiAppToEnv: (environment: Environment) => void
    onAddSystemAppToEnv: (environment: Environment) => void
    onEditApp: (app: KambiApp | SystemApp, environment: Environment) => void
    onRemoveApp: (app: KambiApp | SystemApp, environment: Environment) => void
}
