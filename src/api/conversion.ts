import {Environment, EnvironmentInput, KambiAppInput, KeyValueInput, SystemAppInput} from "./typings";

export function cloneEnv(environment: Environment, appPredicate: (id: string) => boolean = (id) => true): EnvironmentInput {
    return {
        longName: environment.longName,
        shortName: environment.shortName,
        team: environment.team,
        pollIntervalInSec: environment.pollIntervalInSec,
        hosts: [...environment.hosts],
        kambiApps: environment.kambiApps.filter(app => appPredicate(app.id)).map<KambiAppInput>(app => ({
            shortName: app.shortName,
            longName: app.longName,
            category: app.category,
            host: app.host,
            port: app.port,
            legacyContext: app.legacyContext
        })),
        systemApps: environment.systemApps.filter(app => appPredicate(app.id)).map<SystemAppInput>(app => ({
            shortName: app.shortName,
            longName: app.longName,
            category: app.category,
            properties: app.properties.map<KeyValueInput>(prop => ({
                key: prop.key,
                value: prop.value
            }))
        })),
    }
}
