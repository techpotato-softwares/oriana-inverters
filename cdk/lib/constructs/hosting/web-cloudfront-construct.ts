import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { CfnOutput, Duration, RemovalPolicy } from "aws-cdk-lib";
import { EnvironmentConfig, APP_NAME } from "../../config/environment";

export interface WebCloudFrontConstructProps {
  config: EnvironmentConfig;
  /** Lambda Function URL resource (not the URL string — CDK extracts hostname via Fn::Split) */
  functionUrl: lambda.IFunctionUrl;
  mediaBucket?: s3.IBucket;
}

/**
 * CloudFront in front of Lambda Function URL (+ optional S3 media).
 */
export class WebCloudFrontConstruct extends Construct {
  public readonly distribution: cloudfront.Distribution;
  public readonly distributionUrl: string;
  public readonly staticAssetsBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: WebCloudFrontConstructProps) {
    super(scope, id);

    const { config, functionUrl, mediaBucket } = props;

    const useCustomDomain =
      Boolean(config.customDomain) && Boolean(config.cloudFrontCertificateArn);
    const certificate = useCustomDomain
      ? acm.Certificate.fromCertificateArn(
          this,
          "Cert",
          config.cloudFrontCertificateArn!,
        )
      : undefined;

    const lambdaOrigin = new origins.FunctionUrlOrigin(functionUrl, {
      readTimeout: Duration.seconds(60),
      keepaliveTimeout: Duration.seconds(60),
    });

    const defaultBehavior: cloudfront.BehaviorOptions = {
      origin: lambdaOrigin,
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
      cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
      compress: true,
    };

    const additionalBehaviors: Record<string, cloudfront.BehaviorOptions> = {};
    const isProd = config.environment === "prod";

    // Serve hashed Next.js assets from S3 so page loads do not burst the Lambda URL (429).
    this.staticAssetsBucket = new s3.Bucket(this, "StaticAssetsBucket", {
      bucketName: `${APP_NAME}-static-${config.environment}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      autoDeleteObjects: !isProd,
    });

    const staticOrigin = origins.S3BucketOrigin.withOriginAccessControl(
      this.staticAssetsBucket,
    );

    additionalBehaviors["/_next/static/*"] = {
      origin: staticOrigin,
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      compress: true,
    };

    if (mediaBucket) {
      const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(mediaBucket);
      additionalBehaviors["/media/*"] = {
        origin: s3Origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      };
    }

    this.distribution = new cloudfront.Distribution(this, "Distribution", {
      comment: `${APP_NAME}-${config.environment}`,
      defaultBehavior,
      additionalBehaviors:
        Object.keys(additionalBehaviors).length > 0
          ? additionalBehaviors
          : undefined,
      domainNames: useCustomDomain ? [config.customDomain!] : undefined,
      certificate,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    });

    this.distributionUrl = `https://${this.distribution.distributionDomainName}`;

    new CfnOutput(this, "CloudFrontURL", {
      value: this.distributionUrl,
      description: "CloudFront URL (share with team)",
      exportName: `${APP_NAME}-CloudFrontURL-${config.environment}`,
    });

    new CfnOutput(this, "AdminURL", {
      value: `${this.distributionUrl}/admin`,
      description: "Payload CMS admin URL",
      exportName: `${APP_NAME}-AdminURL-${config.environment}`,
    });

    new CfnOutput(this, "StaticAssetsBucketName", {
      value: this.staticAssetsBucket.bucketName,
      description: "S3 bucket for Next.js static assets",
      exportName: `${APP_NAME}-StaticAssetsBucket-${config.environment}`,
    });
  }
}
