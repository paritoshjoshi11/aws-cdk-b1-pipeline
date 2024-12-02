import { Construct } from "constructs";
import { StackProps } from "aws-cdk-lib";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";
import * as s3 from "aws-cdk-lib/aws-s3";
import { GlobalStack } from "./global-stack";
import { SqsStack } from "./sqs-stack";

export class NotificationStack extends GlobalStack {
  constructor(
    scope: Construct,
    environmentTag: string,
    bucket: s3.Bucket, // Specific bucket
    sqsStack: SqsStack
  ) {
    super(scope, environmentTag, "NotificationStack", {
      env: { region: environmentTag },
      tags: { service: "notification" },
    });

    // Attach event notification to the specified bucket
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED, // Event type for object creation
      new s3n.SqsDestination(sqsStack.sqsQueue) // Destination as the SQS queue
    );
  }
}
