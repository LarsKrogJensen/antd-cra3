/* tslint:disable */

/* An ISO-8601 encoded UTC date string. */
export type DateTime = any;
/* The root query for implementing GraphQL queries. */
export interface QueryRoot {
  environments: Environment[]; 
  environment?: Environment | null; 
  systemAppConfig: SystemAppConfig[]; 
}

export interface Environment {
  id: string; 
  shortName: string; 
  longName: string; 
  team: string; 
  pollIntervalInSec: number; 
  hosts: string[]; 
  kambiApps: KambiApp[]; 
  systemApps: SystemApp[]; 
}

export interface KambiApp {
  id: string; 
  shortName: string; 
  longName: string; 
  host: string; 
  port: number; 
  category: AppCategory; 
  legacyContext?: string | null; 
  metrics?: AppMetrics | null; 
}

export interface AppMetrics {
  version?: string | null; 
  scmBranch?: string | null; 
  upSince?: DateTime | null; 
  running?: boolean | null; 
}

export interface SystemApp {
  id: string; 
  shortName: string; 
  longName: string; 
  category: AppCategory; 
  properties: KeyValue[]; 
  metrics?: AppMetrics | null; 
}

export interface KeyValue {
  key: string; 
  value: string; 
}

export interface SystemAppConfig {
  category: AppCategory; 
  properties: KeyValue[]; 
}
/* The root query for implementing GraphQL mutations. */
export interface MutationRoot {
  createEnvironment?: CreateEnvironmentPayload | null; /* Create and add a new environment with the provided apps */
  deleteEnvironment?: DeleteEnvironmentPayload | null; /* Delete an environment */
  updateEnvironment?: UpdateEnvironmentPayload | null; /* Update an environment */
}

export interface CreateEnvironmentPayload {
  clientMutationId?: string | null; 
  environment: Environment; /* The newly created and added environment */
}

export interface DeleteEnvironmentPayload {
  clientMutationId?: string | null; /* A unique identifier for the client performing the mutation. */
  environment: Environment; /* The deleted environment */
}

export interface UpdateEnvironmentPayload {
  clientMutationId?: string | null; /* A unique identifier for the client performing the mutation. */
  environment?: Environment | null; /* The updated environment */
}

export interface CreateEnvironmentInput {
  clientMutationId?: string | null; 
  environment: EnvironmentInput; 
}

export interface EnvironmentInput {
  shortName: string; 
  longName: string; 
  team: string; 
  pollIntervalInSec: number; 
  hosts: string[]; 
  kambiApps: KambiAppInput[]; 
  systemApps: SystemAppInput[]; 
}

export interface KambiAppInput {
  shortName: string; 
  longName: string; 
  host: string; 
  port: number; 
  category?: AppCategory | null; 
  legacyContext?: string | null; 
}

export interface SystemAppInput {
  shortName: string; 
  longName: string; 
  category: AppCategory; 
  properties: KeyValueInput[]; 
}

export interface KeyValueInput {
  key: string; 
  value: string; 
}

export interface DeleteEnvironmentInput {
  clientMutationId?: string | null; 
  environmentId: string; 
}

export interface UpdateEnvironmentInput {
  clientMutationId?: string | null; 
  environmentId: string; 
  environment: EnvironmentInput; 
}
export interface EnvironmentQueryRootArgs {
  id: string; 
}
export interface CreateEnvironmentMutationRootArgs {
  input: CreateEnvironmentInput; 
}
export interface DeleteEnvironmentMutationRootArgs {
  input: DeleteEnvironmentInput; 
}
export interface UpdateEnvironmentMutationRootArgs {
  input: UpdateEnvironmentInput; 
}

export type AppCategory = "KAMBI_APP" | "KAFKA" | "POSTGRES" | "ACTIVEMQ" | "RABBITMQ" | "ORACLE" | "ZOO_KEEPER";

