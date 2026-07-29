export type Environment = "dev" | "qa" | "prod";

export interface FeatureFlags {
  s3: boolean;
  rds: boolean;
  webLambda: boolean;
}

const defaultFeatures: FeatureFlags = {
  s3: true,
  rds: false,
  webLambda: true,
};

export interface DatabaseConfig {
  /** External DB host (e.g. Supabase). Empty when RDS provides the host. */
  host: string;
  port: number;
  name: string;
  ssl: boolean;
  /** When true, DATABASE_URL comes from Secrets Manager (QA Supabase). */
  external: boolean;
}

export interface EnvironmentConfig {
  environment: Environment;
  stackName: string;
  description: string;
  /** Secrets Manager secret ID for DB credentials / DATABASE_URL */
  dbSecretId: string;
  /** Secrets Manager secret ID for Payload secrets */
  payloadSecretId: string;
  logRetentionDays: number;
  lambdaMemorySize: number;
  lambdaTimeout: number;
  enableXRay: boolean;
  tags: Record<string, string>;
  features: FeatureFlags;
  database: DatabaseConfig;
  customDomain?: string;
  cloudFrontCertificateArn?: string;
}

const APP = process.env.APP_NAME || "oriana-invertors-web";

const baseConfig = {
  tags: {
    Project: "oriana-invertors-web",
    Application: "oriana-invertors-web",
    ManagedBy: "CDK",
  },
};

export const environmentConfigs: Record<Environment, EnvironmentConfig> = {
  dev: {
    ...baseConfig,
    environment: "dev",
    stackName: `${APP}-dev`,
    description: "Oriana Invertors Web - Development",
    dbSecretId: `/${APP}/dev/database`,
    payloadSecretId: `/${APP}/dev/payload`,
    logRetentionDays: 7,
    lambdaMemorySize: 1024,
    lambdaTimeout: 60,
    enableXRay: false,
    tags: { ...baseConfig.tags, Environment: "dev" },
    features: { ...defaultFeatures, rds: false },
    database: {
      host: process.env.DB_HOST || "localhost",
      port: 5432,
      name: process.env.DB_NAME || "oriana",
      ssl: false,
      external: true,
    },
  },
  qa: {
    ...baseConfig,
    environment: "qa",
    stackName: `${APP}-qa`,
    description: "Oriana Invertors Web - QA (Supabase)",
    dbSecretId: `/${APP}/qa/database`,
    payloadSecretId: `/${APP}/qa/payload`,
    logRetentionDays: 14,
    lambdaMemorySize: 1536,
    lambdaTimeout: 60,
    enableXRay: true,
    tags: { ...baseConfig.tags, Environment: "qa" },
    features: { ...defaultFeatures, rds: false },
    database: {
      host: process.env.DB_HOST || "",
      port: 5432,
      name: process.env.DB_NAME || "postgres",
      ssl: true,
      external: true,
    },
  },
  prod: {
    ...baseConfig,
    environment: "prod",
    stackName: `${APP}-prod`,
    description: "Oriana Invertors Web - Production (RDS)",
    dbSecretId: `/${APP}/prod/database`,
    payloadSecretId: `/${APP}/prod/payload`,
    logRetentionDays: 90,
    lambdaMemorySize: 2048,
    lambdaTimeout: 60,
    enableXRay: true,
    tags: { ...baseConfig.tags, Environment: "prod" },
    features: { ...defaultFeatures, rds: true },
    database: {
      host: "",
      port: 5432,
      name: process.env.DB_NAME || "oriana",
      ssl: true,
      external: false,
    },
    customDomain: process.env.CUSTOM_DOMAIN || undefined,
    cloudFrontCertificateArn:
      process.env.CLOUDFRONT_CERTIFICATE_ARN || undefined,
  },
};

export const getEnvironmentConfig = (env: Environment): EnvironmentConfig => {
  return environmentConfigs[env];
};

export const APP_NAME = APP;
