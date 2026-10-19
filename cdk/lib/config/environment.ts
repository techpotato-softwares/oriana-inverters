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
  /** Postgres schema for this app (multi-tenant on shared RDS). */
  schema: string;
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
  /** Canonical public hostname. Payload and the Lambda server URL use this. */
  customDomain?: string;
  /** Extra hostnames on the same CloudFront certificate (for example www). */
  customDomains?: string[];
  /** ACM certificate in us-east-1. Required whenever a custom domain is set. */
  cloudFrontCertificateArn?: string;
  /**
   * Attach the custom domain on this deploy. Leave false while the ACM
   * certificate is still Pending validation — CloudFront rejects it.
   */
  attachCustomDomain?: boolean;
}

/** True only when the certificate is ready to attach to CloudFront. */
export const customDomainActive = (config: EnvironmentConfig): boolean =>
  Boolean(config.attachCustomDomain) &&
  Boolean(config.customDomain?.trim()) &&
  Boolean(config.cloudFrontCertificateArn?.trim());

/** Hostnames CloudFront should accept. The canonical domain is first. */
export const cloudFrontHostnames = (config: EnvironmentConfig): string[] => {
  if (!customDomainActive(config)) return [];
  const hosts = [config.customDomain, ...(config.customDomains ?? [])];
  return [
    ...new Set(
      hosts
        .map((host) => host?.trim())
        .filter((host): host is string => Boolean(host)),
    ),
  ];
};

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
      schema: process.env.DB_SCHEMA || "public",
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
    // Extra headroom for Sharp imageSizes after clientUploads lands the original in S3
    lambdaTimeout: 120,
    enableXRay: true,
    tags: { ...baseConfig.tags, Environment: "qa" },
    features: { ...defaultFeatures, rds: false },
    database: {
      host: process.env.DB_HOST || "",
      port: 5432,
      name: process.env.DB_NAME || "postgres",
      schema: process.env.DB_SCHEMA || "public",
      ssl: true,
      external: true,
    },
  },
  prod: {
    ...baseConfig,
    environment: "prod",
    stackName: `${APP}-prod`,
    description: "Oriana Invertors Web - Production (shared RDS oriana-web)",
    dbSecretId: `/${APP}/prod/database`,
    payloadSecretId: `/${APP}/prod/payload`,
    logRetentionDays: 90,
    lambdaMemorySize: 2048,
    lambdaTimeout: 120,
    enableXRay: true,
    tags: { ...baseConfig.tags, Environment: "prod" },
    features: { ...defaultFeatures, rds: true },
    database: {
      host: "",
      port: 5432,
      name: process.env.DB_NAME || "postgres",
      schema: process.env.DB_SCHEMA || "oriana_invertors",
      ssl: true,
      external: false,
    },
    // Host and certificate stay here so a later deploy does not drop them.
    // ACM certificate is Issued; CloudFront attaches these names on prod deploy.
    customDomain: "orianainverters.com",
    customDomains: ["www.orianainverters.com"],
    cloudFrontCertificateArn: "arn:aws:acm:us-east-1:856727777833:certificate/3f980f7d-3bfb-4f99-aadd-229902a4a082",
    attachCustomDomain: true,
  },
};

export const getEnvironmentConfig = (env: Environment): EnvironmentConfig => {
  return environmentConfigs[env];
};

export const APP_NAME = APP;
