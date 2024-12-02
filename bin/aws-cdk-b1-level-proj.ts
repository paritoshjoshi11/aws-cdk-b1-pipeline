#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as s3 from "aws-cdk-lib/aws-s3";
import { s3EnvironmentConfig, SimpleStroageSysConfig } from '../lib/config/s3-config';
import { DeploymentConfig, DeploymentConfigs } from '../lib/config/cdk-deployment-configs';
import { AwsCdkS3Stack } from '../lib/stack/s3-stack';
import { SqsStack } from '../lib/stack/sqs-stack';
import { NotificationStack } from '../lib/stack/notification-stack';

const app = new cdk.App();
const s3Config = new SimpleStroageSysConfig();
const deploymentConfig = new DeploymentConfigs();

// Create S3 resources for each environment
const s3Stacks: AwsCdkS3Stack[] = []; // Store created S3 stacks to use later
s3Config.environments.forEach((env) => {
    const s3Stack = createS3Resources(env); // Create the S3 resources and store the stack
    s3Stacks.push(s3Stack); // Store the stack
});

// Create Lambda resources and associated Notification Stack for each deployment config
deploymentConfig.deploymentConfigs.forEach((env: DeploymentConfig) => {
  const sqsStack = createSqsStack(env); // Create an SQS stack for the environment
  
  // Retrieve the correct S3 stack for this environment
  const s3Stack = s3Stacks.find(stack => stack.stackName.includes(env.environmentTag));

  if (s3Stack) {
    const targetBucket = getTargetBucket(s3Stack, env.accountRegion); // Get the specific bucket
    if (targetBucket) {
      createNotificationStack(env.environmentTag, targetBucket, sqsStack); // Create the Notification Stack
    }
  }
});

function createS3Resources(env: s3EnvironmentConfig): AwsCdkS3Stack {
  // Create an S3 stack for the environment and return the stack instance
  return new AwsCdkS3Stack(app, env);
}

function getTargetBucket(s3Stack: AwsCdkS3Stack, environmentTag: string): s3.Bucket | undefined {
  // Retrieve the specific bucket (e.g., "datalake-landing-us" for the US environment)
  const bucketName = `datalake-b1-landing-${environmentTag}`;
  const buckets = s3Stack.node.findAll().filter((node) => node instanceof s3.Bucket) as s3.Bucket[];
  return buckets.find((bucket) => bucket.bucketName === bucketName);
}

function createNotificationStack(
  environmentTag: string,
  bucket: s3.Bucket,
  sqsStack: SqsStack
) {
  // Create a Notification stack that associates the S3 bucket with the SQS queue
  new NotificationStack(app, environmentTag, bucket, sqsStack);
}

function createSqsStack(config: DeploymentConfig): SqsStack {
  // Create an SQS stack for the environment and return the stack instance
  return new SqsStack(app, config.accountRegion);
}
