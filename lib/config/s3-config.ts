import { usRegion,commonTags } from "./common/aws-account-constants"; 
import { landingBucketUS,publishedBucketUS,glueBucketUS,S3BucketProps } from "./common/s3-bucket-config";
import { landingBucketPolicyUS,IResourcePolicyProps} from "./common/s3-bucket-policy-config";

export interface s3EnvironmentConfig{
    environmentTag : string,
    accountRegion : string,
    buckets : S3BucketProps[],
    tag : {},
    resourcePolicy: IResourcePolicyProps
}

export class SimpleStroageSysConfig{
    public readonly environments: s3EnvironmentConfig[] = [
        {
            environmentTag : "us",
            accountRegion : usRegion,
            buckets: [
                landingBucketUS,
                publishedBucketUS,
                glueBucketUS
            ],
            tag:{
                ...commonTags,
                complaince: "true"
            },
            resourcePolicy: landingBucketPolicyUS
        }
    ]
}