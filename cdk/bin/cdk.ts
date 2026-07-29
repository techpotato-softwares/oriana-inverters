#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { OrianaInvertorsWebStack } from "../lib/stacks/oriana-invertors-web-stack";
import {
  getEnvironmentConfig,
  Environment,
  APP_NAME,
} from "../lib/config/environment";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
  region:
    process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || "ap-south-1",
};

const allEnvironments: Environment[] = ["dev", "qa", "prod"];

const targetStack = process.argv.find((arg) =>
  allEnvironments.some((e) => arg.includes(`${APP_NAME}-${e}`)),
);

let environmentsToSynthesize: Environment[];

if (targetStack) {
  const targetEnv = allEnvironments.find((e) => targetStack.includes(`-${e}`));
  environmentsToSynthesize = targetEnv ? [targetEnv] : allEnvironments;
} else {
  environmentsToSynthesize = allEnvironments;
}

environmentsToSynthesize.forEach((environment) => {
  const config = getEnvironmentConfig(environment);

  new OrianaInvertorsWebStack(app, config.stackName, {
    config,
    env,
  });
});

app.synth();
