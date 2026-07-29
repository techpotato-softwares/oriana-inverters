/**
 * S3 media bucket config for oriana-invertors-web
 */
import { Environment } from "../lib/config/environment";
import { RemovalPolicy } from "aws-cdk-lib";

export interface S3BucketConfig {
  id: string;
  bucketNamePrefix: string;
  versioned?: boolean;
  enableCors?: boolean;
  blockPublicAccess?: boolean;
  encryption?: boolean;
  removalPolicy?: RemovalPolicy;
  corsAllowedOrigins?: string[];
  corsAllowedMethods?: ("GET" | "PUT" | "POST" | "DELETE" | "HEAD")[];
}

export interface S3EnvironmentConfig {
  buckets: S3BucketConfig[];
}

const defaultBucketConfig: Partial<S3BucketConfig> = {
  versioned: false,
  enableCors: true,
  blockPublicAccess: true,
  encryption: true,
  corsAllowedOrigins: ["*"],
  corsAllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
};

const MEDIA_PREFIX = "oriana-invertors-web-media";

export const s3Config: Record<Environment, S3EnvironmentConfig> = {
  dev: {
    buckets: [
      {
        ...defaultBucketConfig,
        id: "media",
        bucketNamePrefix: MEDIA_PREFIX,
        versioned: false,
        removalPolicy: RemovalPolicy.DESTROY,
        corsAllowedOrigins: [
          "__AUTO__",
          "http://localhost:3000",
        ],
        corsAllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  },
  qa: {
    buckets: [
      {
        ...defaultBucketConfig,
        id: "media",
        bucketNamePrefix: MEDIA_PREFIX,
        versioned: true,
        removalPolicy: RemovalPolicy.DESTROY,
        corsAllowedOrigins: ["__AUTO__"],
        corsAllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  },
  prod: {
    buckets: [
      {
        ...defaultBucketConfig,
        id: "media",
        bucketNamePrefix: MEDIA_PREFIX,
        versioned: true,
        removalPolicy: RemovalPolicy.RETAIN,
        corsAllowedOrigins: ["__AUTO__"],
        corsAllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  },
};

export const getS3Config = (env: Environment): S3EnvironmentConfig => {
  return s3Config[env];
};
