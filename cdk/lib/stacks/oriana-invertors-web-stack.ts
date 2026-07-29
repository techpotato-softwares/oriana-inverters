import { Stack, StackProps, Tags, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as path from "path";
import { EnvironmentConfig, APP_NAME } from "../config/environment";
import { S3Construct } from "../constructs/storage/s3-construct";
import { RDSConstruct } from "../constructs/database/rds-construct";
import { WebLambdaConstruct } from "../constructs/core/web-lambda-construct";
import { WebCloudFrontConstruct } from "../constructs/hosting/web-cloudfront-construct";

export interface OrianaInvertorsWebStackProps extends StackProps {
  config: EnvironmentConfig;
}

/**
 * Stack: oriana-invertors-web-{env}
 *
 * Secrets must already exist in Secrets Manager (created by ops / first CI bootstrap):
 *   /oriana-invertors-web/{env}/database  → { DATABASE_URL }
 *   /oriana-invertors-web/{env}/payload   → { PAYLOAD_SECRET, CRON_SECRET, PREVIEW_SECRET }
 *
 * GitHub Actions injects real values into Lambda env after deploy.
 */
export class OrianaInvertorsWebStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: OrianaInvertorsWebStackProps,
  ) {
    super(scope, id, {
      ...props,
      description: props.config.description,
    });

    const { config } = props;

    Object.entries(config.tags).forEach(([key, value]) => {
      Tags.of(this).add(key, value);
    });

    console.log(`\nBuilding stack: ${config.stackName}`);

    let s3Construct: S3Construct | undefined;
    if (config.features.s3) {
      console.log("\nCreating media S3 bucket...");
      s3Construct = new S3Construct(this, "MediaS3", {
        config,
        additionalCorsOrigins: [],
      });
    }

    let rdsConstruct: RDSConstruct | undefined;
    if (config.features.rds) {
      console.log("\nCreating RDS PostgreSQL...");
      rdsConstruct = new RDSConstruct(this, "RDS", { config });
    }

    // Reference secrets created outside CDK (QA Supabase URL, Payload secrets)
    const payloadSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "PayloadSecret",
      config.payloadSecretId,
    );

    if (config.database.external && !rdsConstruct) {
      secretsmanager.Secret.fromSecretNameV2(
        this,
        "DatabaseSecret",
        config.dbSecretId,
      );
    }

    const mediaBucket = s3Construct?.getBucket("media");
    const repoRoot = path.join(__dirname, "../../../");

    // Placeholder env — deploy workflow overwrites with Secrets Manager values + CloudFront URL
    const lambdaEnv: Record<string, string> = {
      DATABASE_URL:
        process.env.DATABASE_URL ||
        "postgresql://placeholder:placeholder@localhost:5432/postgres",
      PAYLOAD_SECRET:
        process.env.PAYLOAD_SECRET ||
        process.env.PAYLOAD_SECRET_PLACEHOLDER ||
        "CHANGE_ME",
      CRON_SECRET:
        process.env.CRON_SECRET ||
        process.env.CRON_SECRET_PLACEHOLDER ||
        "CHANGE_ME",
      PREVIEW_SECRET:
        process.env.PREVIEW_SECRET ||
        process.env.PREVIEW_SECRET_PLACEHOLDER ||
        "CHANGE_ME",
      S3_BUCKET: mediaBucket?.bucketName || "",
      S3_REGION: Stack.of(this).region,
      NEXT_PUBLIC_SERVER_URL:
        process.env.NEXT_PUBLIC_SERVER_URL ||
        "https://placeholder.cloudfront.net",
    };

    if (rdsConstruct) {
      lambdaEnv.DB_HOST = rdsConstruct.instance.instanceEndpoint.hostname;
      lambdaEnv.DB_PORT = String(config.database.port);
      lambdaEnv.DB_NAME = config.database.name;
      lambdaEnv.DB_SECRET_ID = config.dbSecretId;
    }

    console.log("\nCreating web Lambda (container + Web Adapter)...");
    const webLambda = new WebLambdaConstruct(this, "WebLambda", {
      config,
      repoRoot,
      environment: lambdaEnv,
      permissions: s3Construct?.permissions || [],
    });

    // Grant secret read (in addition to policy in WebLambdaConstruct)
    payloadSecret.grantRead(webLambda.fn);
    if (rdsConstruct) {
      rdsConstruct.secret.grantRead(webLambda.fn);
    }

    console.log("\nCreating CloudFront...");
    const cf = new WebCloudFrontConstruct(this, "CloudFront", {
      config,
      functionUrl: webLambda.functionUrl,
      mediaBucket,
    });

    new CfnOutput(this, "RecommendedServerURL", {
      value: cf.distributionUrl,
      description:
        "Set NEXT_PUBLIC_SERVER_URL on the Lambda to this value after deploy",
      exportName: `${APP_NAME}-RecommendedServerURL-${config.environment}`,
    });

    if (mediaBucket) {
      new CfnOutput(this, "MediaBucketName", {
        value: mediaBucket.bucketName,
        description: "S3 media bucket",
        exportName: `${APP_NAME}-MediaBucket-${config.environment}`,
      });
    }
  }
}
