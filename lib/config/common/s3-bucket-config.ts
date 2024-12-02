export interface S3BucketProps {
    readonly bucketName :string
}

export const landingBucketUS : S3BucketProps = {
    bucketName : "datalake-b1-landing-us"
}

export const publishedBucketUS : S3BucketProps = {
    bucketName : "datalake-b1-published-us"
}

export const glueBucketUS : S3BucketProps = {
    bucketName : "glue-script-b1-us"
}

