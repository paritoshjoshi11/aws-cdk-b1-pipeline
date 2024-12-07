import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { S3BucketProps } from '../config/common/s3-bucket-config'; 
import { IResourcePolicyProps } from '../config/common/s3-bucket-policy-config';
import { GlobalStack } from './global-stack';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications'; 

export class AwsCdkS3Stack extends GlobalStack {

  constructor(
    scope : Construct,
    environment: {
      environmentTag : string;
      accountRegion: string;
      buckets: S3BucketProps[];
      tag:{};
      resourcePolicy : IResourcePolicyProps;
    }
  ){
    super(
      scope,
      environment.environmentTag,
      "SimpleStorageSystem",
      createCommonAccessStackProps(environment),
    );

    environment.buckets.forEach((bucket) =>{
      let s3Bucket = new s3.Bucket(this,
        bucket.bucketName,{
          bucketName : bucket.bucketName,
          autoDeleteObjects: true,
          removalPolicy : cdk.RemovalPolicy.DESTROY
        }
      )
      // Only configure event notification for the specific bucket 'sdjklm'
      if (bucket.bucketName === 'datalake-b1-landing-us') {
        // Create SQS Queue
        const sqsQueue = new sqs.Queue(this, `${bucket.bucketName}Queue`, {
          queueName: `${bucket.bucketName}Queue`,
        });

        // Add S3 bucket event notification to trigger the SQS queue
        s3Bucket.addEventNotification(
          s3.EventType.OBJECT_CREATED, // Trigger on object created
          new s3n.SqsDestination(sqsQueue) // Target is SQS Queue
        );
      }
    })

  }
}


function createCommonAccessStackProps(environment:{
  environmentTag : String;
  accountRegion : string;
  tag: {}
}): cdk.StackProps{
  return {
    tags : {
      ...environment.tag,
    },
    env: {
      region : environment.accountRegion
    }
  }
}
