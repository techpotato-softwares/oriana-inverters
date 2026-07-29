import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ecr_assets from "aws-cdk-lib/aws-ecr-assets";
import * as iam from "aws-cdk-lib/aws-iam";
import * as logs from "aws-cdk-lib/aws-logs";
import { Duration, CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import * as path from "path";
import { EnvironmentConfig, APP_NAME } from "../../config/environment";

function retentionDays(days: number): logs.RetentionDays {
  const map: Record<number, logs.RetentionDays> = {
    1: logs.RetentionDays.ONE_DAY,
    3: logs.RetentionDays.THREE_DAYS,
    5: logs.RetentionDays.FIVE_DAYS,
    7: logs.RetentionDays.ONE_WEEK,
    14: logs.RetentionDays.TWO_WEEKS,
    30: logs.RetentionDays.ONE_MONTH,
    60: logs.RetentionDays.TWO_MONTHS,
    90: logs.RetentionDays.THREE_MONTHS,
  };
  return map[days] ?? logs.RetentionDays.TWO_WEEKS;
}

export interface WebLambdaConstructProps {
  config: EnvironmentConfig;
  /** Absolute path to monorepo root (Dockerfile context) */
  repoRoot: string;
  environment: Record<string, string>;
  /** Extra IAM statements (e.g. S3) */
  permissions?: iam.PolicyStatement[];
}

/**
 * Container Lambda running Next.js + Payload via AWS Lambda Web Adapter.
 * Function name: oriana-invertors-web-{env}
 */
export class WebLambdaConstruct extends Construct {
  public readonly fn: lambda.DockerImageFunction;
  public readonly functionUrl: lambda.FunctionUrl;

  constructor(scope: Construct, id: string, props: WebLambdaConstructProps) {
    super(scope, id);

    const { config, repoRoot, environment, permissions = [] } = props;
    const functionName = `${APP_NAME}-${config.environment}`;

    this.fn = new lambda.DockerImageFunction(this, "WebFunction", {
      functionName,
      description: `Oriana Invertors Web (${config.environment})`,
      code: lambda.DockerImageCode.fromImageAsset(repoRoot, {
        file: "apps/cms/Dockerfile",
        platform: ecr_assets.Platform.LINUX_AMD64,
        exclude: [
          "cdk/cdk.out",
          "**/node_modules",
          "**/.next",
          "**/.git",
          "**/payload.db",
          "tests",
        ],
      }),
      memorySize: config.lambdaMemorySize,
      timeout: Duration.seconds(config.lambdaTimeout),
      architecture: lambda.Architecture.X86_64,
      environment: {
        NODE_ENV: "production",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/bootstrap",
        PORT: "3000",
        AWS_LWA_ENABLE_COMPRESSION: "true",
        ...environment,
      },
      loggingFormat: lambda.LoggingFormat.JSON,
      logGroup: new logs.LogGroup(this, "WebLogGroup", {
        logGroupName: `/aws/lambda/${functionName}`,
        retention: retentionDays(config.logRetentionDays),
        removalPolicy:
          config.environment === "prod"
            ? RemovalPolicy.RETAIN
            : RemovalPolicy.DESTROY,
      }),
      tracing: config.enableXRay
        ? lambda.Tracing.ACTIVE
        : lambda.Tracing.DISABLED,
    });

    for (const statement of permissions) {
      this.fn.addToRolePolicy(statement);
    }

    // Allow reading secrets
    this.fn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["secretsmanager:GetSecretValue"],
        resources: [
          `arn:aws:secretsmanager:*:*:secret:${config.dbSecretId}*`,
          `arn:aws:secretsmanager:*:*:secret:${config.payloadSecretId}*`,
        ],
      }),
    );

    this.functionUrl = this.fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
    });

    new CfnOutput(this, "FunctionUrl", {
      value: this.functionUrl.url,
      description: `Lambda Function URL for ${functionName}`,
      exportName: `${APP_NAME}-FunctionUrl-${config.environment}`,
    });

    new CfnOutput(this, "FunctionName", {
      value: this.fn.functionName,
      description: "Web Lambda function name",
      exportName: `${APP_NAME}-FunctionName-${config.environment}`,
    });
  }
}
