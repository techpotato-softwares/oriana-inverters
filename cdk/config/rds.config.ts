/**
 * RDS Database Configuration
 *
 * Define RDS settings for each environment.
 *
 * COST REFERENCE (us-east-1, on-demand pricing):
 * ┌─────────────────┬────────────┬──────────────┬─────────────────┐
 * │ Instance        │ vCPU / RAM │ Single-AZ    │ Multi-AZ        │
 * ├─────────────────┼────────────┼──────────────┼─────────────────┤
 * │ db.t4g.micro    │ 2 / 1 GB   │ ~$12/month   │ ~$24/month      │
 * │ db.t4g.small    │ 2 / 2 GB   │ ~$24/month   │ ~$48/month      │
 * │ db.t4g.medium   │ 2 / 4 GB   │ ~$48/month   │ ~$96/month      │
 * │ db.t4g.large    │ 2 / 8 GB   │ ~$96/month   │ ~$192/month     │
 * └─────────────────┴────────────┴──────────────┴─────────────────┘
 *
 * ADDITIONAL COSTS:
 * - NAT Gateway (if private): ~$32/month + data transfer
 * - Storage: $0.115/GB/month (gp3)
 * - Backups beyond free tier: $0.095/GB/month
 *
 * ALTERNATIVE: Use Neon (https://neon.tech) for serverless PostgreSQL
 * - Free tier: 0.5 GB storage, 191 compute hours/month
 * - Paid: $0.0255/compute-hour, $0.75/GB storage/month
 */

import { Environment } from "../lib/config/environment";
import * as ec2 from "aws-cdk-lib/aws-ec2";

/**
 * Schedule configuration for RDS instance (for cost savings)
 */
export interface RDSScheduleConfig {
  /** Enable scheduling (default: false) */
  enabled: boolean;
  /**
   * Cron expression to START the RDS instance (UTC timezone)
   * Format: cron(minutes hours day-of-month month day-of-week year)
   * Example: "cron(0 6 ? * MON-FRI *)" = 6:00 AM UTC, Monday-Friday
   */
  startSchedule?: string;
  /**
   * Cron expression to STOP the RDS instance (UTC timezone)
   * Format: cron(minutes hours day-of-month month day-of-week year)
   * Example: "cron(0 18 ? * MON-FRI *)" = 6:00 PM UTC, Monday-Friday
   */
  stopSchedule?: string;
  /**
   * Timezone reference (for documentation only - cron runs in UTC)
   * @default "UTC"
   */
  timezone?: string;
}

/**
 * Configuration for RDS instance
 */
export interface RDSEnvironmentConfig {
  /** Database instance class (e.g., T3, T4G, R6G) */
  instanceClass: ec2.InstanceClass;
  /** Database instance size (e.g., MICRO, SMALL, MEDIUM) */
  instanceSize: ec2.InstanceSize;
  /** Database name */
  databaseName: string;
  /** Database master username */
  username: string;
  /** Database port */
  port: number;
  /** Allocated storage in GB */
  allocatedStorage: number;
  /** Maximum allocated storage for autoscaling (GB) */
  maxAllocatedStorage: number;
  /** Enable Multi-AZ deployment for high availability */
  multiAz: boolean;
  /** Enable deletion protection (prevents accidental deletion) */
  deletionProtection: boolean;
  /** Backup retention period in days */
  backupRetentionDays: number;
  /** Make the database publicly accessible (use with caution!) */
  publiclyAccessible: boolean;
  /**
   * Schedule configuration to auto-start/stop RDS for cost savings
   * COST SAVINGS: Running 12h/day instead of 24h = 50% savings!
   */
  schedule?: RDSScheduleConfig;
}

/**
 * Default RDS configuration
 */
const defaultRDSConfig: Partial<RDSEnvironmentConfig> = {
  databaseName: "oriana",
  username: "oriana_admin",
  port: 5432,
};

/**
 * RDS configuration for all environments
 *
 * IMPORTANT NOTES:
 * - Production uses deletion protection and creates snapshots on delete
 * - QA uses Supabase (features.rds: false) — RDS config here is for prod
 * - Multi-AZ is only enabled for production when needed
 */
export const rdsConfig: Record<Environment, RDSEnvironmentConfig> = {
  dev: {
    ...defaultRDSConfig,
    databaseName: "oriana",
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
    databaseName: "oriana",
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
    databaseName: "oriana",
    username: "oriana_admin",
    port: 5432,
    instanceClass: ec2.InstanceClass.T4G,
    instanceSize: ec2.InstanceSize.MICRO,
    allocatedStorage: 20,
    maxAllocatedStorage: 100,
    multiAz: false,
    deletionProtection: true,
    backupRetentionDays: 1,
    publiclyAccessible: true,
    schedule: {
      enabled: true,
      startSchedule: "cron(30 1 ? * MON-SAT *)",
      stopSchedule: "cron(30 16 ? * MON-SAT *)",
      timezone: "Asia/Kolkata",
    },
  },
};

/**
 * Get RDS configuration for a specific environment
 */
export const getRDSConfig = (env: Environment): RDSEnvironmentConfig => {
  return rdsConfig[env];
};
