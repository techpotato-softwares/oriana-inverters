import { Construct } from "constructs";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as iam from "aws-cdk-lib/aws-iam";
import { CfnOutput, Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { EnvironmentConfig } from "../../config/environment";
import { RDSEnvironmentConfig, getRDSConfig } from "../../../config/rds.config";
import { IPermissionProvider } from "../permissions/lambda-permissions";

export interface RDSConstructProps {
  config: EnvironmentConfig;
  vpc?: ec2.IVpc;
}

/**
 * Shared RDS PostgreSQL (`oriana-web` in prod).
 *
 * Credentials are auto-generated into Secrets Manager. After deploy, CI runs
 * `scripts/sync-rds-app-secret.sh` to:
 *  1. CREATE SCHEMA IF NOT EXISTS <site schema>
 *  2. Write the app connection secret (DB_* + DATABASE_URL + DB_SCHEMA)
 *
 * Multiple websites can share this instance via different schemas.
 */
export class RDSConstruct extends Construct implements IPermissionProvider {
  public readonly instance: rds.DatabaseInstance;
  /** Raw RDS master credentials (username / password) — managed by CDK */
  public readonly masterSecret: secretsmanager.ISecret;
  public readonly vpc: ec2.IVpc;
  public readonly securityGroup: ec2.SecurityGroup;
  public readonly permissions: iam.PolicyStatement[] = [];
  public readonly schemaName: string;
  public readonly databaseName: string;
  public readonly instanceIdentifier: string;

  constructor(scope: Construct, id: string, props: RDSConstructProps) {
    super(scope, id);

    const { config } = props;
    const rdsConfig = getRDSConfig(config.environment);
    const isProd = config.environment === "prod";

    this.schemaName = rdsConfig.schemaName;
    this.databaseName = rdsConfig.databaseName;
    this.instanceIdentifier = rdsConfig.instanceIdentifier;

    console.log(
      `   Creating shared RDS "${rdsConfig.instanceIdentifier}" (schema ${rdsConfig.schemaName})…`,
    );

    this.vpc = props.vpc ?? this.createVpc(config, rdsConfig);

    this.securityGroup = new ec2.SecurityGroup(this, "DatabaseSecurityGroup", {
      vpc: this.vpc,
      securityGroupName: `${rdsConfig.instanceIdentifier}-sg`,
      description: `Security group for shared RDS ${rdsConfig.instanceIdentifier}`,
      allowAllOutbound: false,
    });

    if (rdsConfig.publiclyAccessible) {
      this.securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(rdsConfig.port),
        "Allow PostgreSQL access (CI schema sync + Lambda)",
      );
    } else {
      this.securityGroup.addIngressRule(
        ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
        ec2.Port.tcp(rdsConfig.port),
        "Allow PostgreSQL access from VPC",
      );
    }

    // Master credentials — separate from app connection secret so CDK can own rotation
    const masterSecretName = `${config.dbSecretId}-master`;
    this.masterSecret = new secretsmanager.Secret(this, "DatabaseMasterSecret", {
      secretName: masterSecretName,
      description: `RDS master credentials for ${rdsConfig.instanceIdentifier}`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: rdsConfig.username,
        }),
        generateStringKey: "password",
        excludePunctuation: true,
        passwordLength: 32,
      },
    });

    const removalPolicy = isProd
      ? RemovalPolicy.SNAPSHOT
      : rdsConfig.deletionProtection
        ? RemovalPolicy.RETAIN
        : RemovalPolicy.DESTROY;

    this.instance = new rds.DatabaseInstance(this, "Database", {
      instanceIdentifier: rdsConfig.instanceIdentifier,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_18_1,
      }),
      instanceType: ec2.InstanceType.of(
        rdsConfig.instanceClass,
        rdsConfig.instanceSize,
      ),
      vpc: this.vpc,
      vpcSubnets: {
        subnetType: rdsConfig.publiclyAccessible
          ? ec2.SubnetType.PUBLIC
          : ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [this.securityGroup],
      credentials: rds.Credentials.fromSecret(this.masterSecret),
      databaseName: rdsConfig.databaseName,
      port: rdsConfig.port,
      allocatedStorage: rdsConfig.allocatedStorage,
      maxAllocatedStorage: rdsConfig.maxAllocatedStorage,
      storageType: rds.StorageType.GP3,
      storageEncrypted: true,
      backupRetention: Duration.days(rdsConfig.backupRetentionDays),
      preferredBackupWindow: "03:00-04:00",
      preferredMaintenanceWindow: "Sun:04:00-Sun:05:00",
      multiAz: rdsConfig.multiAz,
      deletionProtection: rdsConfig.deletionProtection,
      removalPolicy,
      enablePerformanceInsights: isProd,
      performanceInsightRetention: isProd
        ? rds.PerformanceInsightRetention.DEFAULT
        : undefined,
      monitoringInterval: isProd ? Duration.seconds(60) : undefined,
      publiclyAccessible: rdsConfig.publiclyAccessible,
      autoMinorVersionUpgrade: true,
    });

    this.permissions = this.generatePermissions(config);

    new CfnOutput(this, "DatabaseEndpoint", {
      value: this.instance.instanceEndpoint.hostname,
      description: `Shared RDS endpoint (${rdsConfig.instanceIdentifier})`,
      exportName: `oriana-web-RDS-Endpoint-${config.environment}`,
    });

    new CfnOutput(this, "DatabasePort", {
      value: this.instance.instanceEndpoint.port.toString(),
      description: `RDS port`,
      exportName: `oriana-web-RDS-Port-${config.environment}`,
    });

    new CfnOutput(this, "DatabaseMasterSecretArn", {
      value: this.masterSecret.secretArn,
      description: `Master credentials secret ARN`,
      exportName: `oriana-web-RDS-MasterSecretArn-${config.environment}`,
    });

    new CfnOutput(this, "DatabaseName", {
      value: rdsConfig.databaseName,
      description: `Postgres database name`,
      exportName: `oriana-web-RDS-DatabaseName-${config.environment}`,
    });

    new CfnOutput(this, "DatabaseSchema", {
      value: rdsConfig.schemaName,
      description: `App schema on shared RDS (multi-tenant)`,
      exportName: `oriana-invertors-web-RDS-Schema-${config.environment}`,
    });

    new CfnOutput(this, "DatabaseInstanceId", {
      value: rdsConfig.instanceIdentifier,
      description: `RDS instance identifier`,
      exportName: `oriana-web-RDS-InstanceId-${config.environment}`,
    });

    console.log(
      `   RDS instance: ${rdsConfig.instanceIdentifier} / db=${rdsConfig.databaseName} / schema=${rdsConfig.schemaName}`,
    );
  }

  private createVpc(
    config: EnvironmentConfig,
    rdsConfig: RDSEnvironmentConfig,
  ): ec2.Vpc {
    return new ec2.Vpc(this, "DatabaseVpc", {
      vpcName: `${rdsConfig.instanceIdentifier}-vpc`,
      maxAzs: 2,
      natGateways: rdsConfig.publiclyAccessible ? 0 : 1,
      subnetConfiguration: [
        {
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        ...(rdsConfig.publiclyAccessible
          ? []
          : [
              {
                name: "Private",
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                cidrMask: 24,
              },
            ]),
      ],
    });
  }

  private generatePermissions(config: EnvironmentConfig): iam.PolicyStatement[] {
    return [
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret",
        ],
        resources: [
          this.masterSecret.secretArn,
          `arn:aws:secretsmanager:${Stack.of(this).region}:${Stack.of(this).account}:secret:${config.dbSecretId}*`,
        ],
      }),
    ];
  }

  public getConnectionEnvVars(appDbSecretId: string): Record<string, string> {
    return {
      DB_HOST: this.instance.instanceEndpoint.hostname,
      DB_PORT: this.instance.instanceEndpoint.port.toString(),
      DB_NAME: this.databaseName,
      DB_SCHEMA: this.schemaName,
      DB_SECRET_ID: appDbSecretId,
      DB_MASTER_SECRET_ID: this.masterSecret.secretName!,
    };
  }
}
