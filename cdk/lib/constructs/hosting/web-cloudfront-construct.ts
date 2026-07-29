import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { CfnOutput, Duration } from "aws-cdk-lib";
import { EnvironmentConfig, APP_NAME } from "../../config/environment";

export interface WebCloudFrontConstructProps {
  config: EnvironmentConfig;
  /** Lambda Function URL (https://xxx.lambda-url.region.on.aws/) */
  functionUrl: string;
  mediaBucket?: s3.IBucket;
}

/**
 * CloudFront in front of Lambda Function URL (+ optional S3 media).
 */
export class WebCloudFrontConstruct extends Construct {
  public readonly distribution: cloudfront.Distribution;
  public readonly distributionUrl: string;

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

    // CloudFront HttpOrigin must receive hostname only (no protocol/path/port).
    const originDomain = functionUrl
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "")
      .replace(/:\d+$/, "");

    const lambdaOrigin = new origins.HttpOrigin(originDomain, {
      protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
      httpsPort: 443,
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
  }
}
