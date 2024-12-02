import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { S3BucketProps } from '../config/common/s3-bucket-config'; 
import { IResourcePolicyProps } from '../config/common/s3-bucket-policy-config';
import { GlobalStack } from './global-stack';

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
