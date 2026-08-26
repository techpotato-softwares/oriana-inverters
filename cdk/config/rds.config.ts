/**
 * Shared RDS instance config for cost optimization:
 * one instance (`oriana-web`) hosts multiple site schemas.
 *
 * This website uses schema `oriana_invertors`.
 * Future sites add another schema on the same instance
 * (e.g. `other_client_site`) with their own Secrets Manager entry.
 */

import { Environment } from "../lib/config/environment";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface RDSScheduleConfig {
  enabled: boolean;
  startSchedule?: string;
  stopSchedule?: string;
  timezone?: string;
}

export interface RDSEnvironmentConfig {
  /** Stable shared instance id (not per-app) so multiple stacks can share it later */
  instanceIdentifier: string;
  instanceClass: ec2.InstanceClass;
  instanceSize: ec2.InstanceSize;
  /** Postgres database (container) name on the instance */
  databaseName: string;
  /** App-specific schema inside the database (multi-tenant) */
  schemaName: string;
  username: string;
  port: number;
  allocatedStorage: number;
  maxAllocatedStorage: number;
  multiAz: boolean;
  deletionProtection: boolean;
  backupRetentionDays: number;
  publiclyAccessible: boolean;
  schedule?: RDSScheduleConfig;
}

/** Schema for this website on the shared RDS. Underscores — valid unquoted PG identifier. */
export const SITE_PG_SCHEMA = "oriana_invertors";

/** Shared RDS instance name across Oriana client websites. */
export const SHARED_RDS_INSTANCE_ID = "oriana-web";

const defaultRDSConfig: Partial<RDSEnvironmentConfig> = {
  instanceIdentifier: SHARED_RDS_INSTANCE_ID,
  databaseName: "postgres",
  schemaName: SITE_PG_SCHEMA,
  username: "oriana_admin",
  port: 5432,
};

export const rdsConfig: Record<Environment, RDSEnvironmentConfig> = {
  dev: {
    ...defaultRDSConfig,
    instanceIdentifier: `${SHARED_RDS_INSTANCE_ID}-dev`,
    databaseName: "postgres",
    schemaName: SITE_PG_SCHEMA,
    username: "oriana_admin",
    port: 5432,
    instanceClass: ec2.InstanceClass.T4G,
    instanceSize: ec2.InstanceSize.MICRO,
    allocatedStorage: 20,
    maxAllocatedStorage: 50,
    multiAz: false,
    deletionProtection: false,
    backupRetentionDays: 1,
    publiclyAccessible: true,
  },
  qa: {
    ...defaultRDSConfig,
    // QA uses external Supabase (features.rds: false); kept for reference.
    instanceIdentifier: `${SHARED_RDS_INSTANCE_ID}-qa`,
    databaseName: "postgres",
    schemaName: SITE_PG_SCHEMA,
    username: "oriana_admin",
    port: 5432,
    instanceClass: ec2.InstanceClass.T4G,
    instanceSize: ec2.InstanceSize.SMALL,
    allocatedStorage: 20,
    maxAllocatedStorage: 100,
    multiAz: false,
    deletionProtection: false,
    backupRetentionDays: 7,
    publiclyAccessible: true,
  },
  prod: {
    ...defaultRDSConfig,
    instanceIdentifier: SHARED_RDS_INSTANCE_ID,
    databaseName: "postgres",
    schemaName: SITE_PG_SCHEMA,
    username: "oriana_admin",
    port: 5432,
    instanceClass: ec2.InstanceClass.T4G,
    instanceSize: ec2.InstanceSize.MICRO,
    allocatedStorage: 20,
    maxAllocatedStorage: 100,
    multiAz: false,
    deletionProtection: true,
    backupRetentionDays: 7,
    publiclyAccessible: true,
    schedule: {
      enabled: true,
      startSchedule: "cron(30 1 ? * MON-SAT *)",
      stopSchedule: "cron(30 16 ? * MON-SAT *)",
      timezone: "Asia/Kolkata",
    },
  },
};

export const getRDSConfig = (env: Environment): RDSEnvironmentConfig => {
  return rdsConfig[env];
};
