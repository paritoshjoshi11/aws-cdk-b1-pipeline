import { Construct } from "constructs";
import { Duration, StackProps } from "aws-cdk-lib";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { GlobalStack } from "./global-stack";
import { sqsConfig } from "../config/sqs-config";

export class SqsStack extends GlobalStack {
  public readonly sqsQueue: Queue;

  constructor(scope: Construct, environmentTag: string) {
    super(scope, environmentTag, "SqsStack", {
      env: { region: environmentTag },
      tags: { service: "sqs" },
    });

    // Create the SQS queue
    this.sqsQueue = new Queue(this, "GlueQueue", {
      queueName: sqsConfig.queueName,
      visibilityTimeout: Duration.seconds(sqsConfig.visibilityTimeout),
    });
  }
}
