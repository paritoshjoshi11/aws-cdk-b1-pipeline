import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from "constructs";

export class GlobalStack extends Stack {
    constructor(
        scope: Construct,
        deploymentId: string,
        stackId: string,
        props: StackProps
    ){
        super(scope,`COMMON-${deploymentId}-${stackId}`, props);
    }
}
