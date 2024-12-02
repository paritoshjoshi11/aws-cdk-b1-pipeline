#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { s3EnvironmentConfig, SimpleStroageSysConfig } from '../lib/config/s3-config';
import { config } from 'process';
import { AwsCdkS3Stack } from '../lib/stack/s3-stack';

const app = new cdk.App();
const s3Config = new SimpleStroageSysConfig();


s3Config.environments.forEach((env) => {
    createS3Resources(env)
})

function createS3Resources(env : s3EnvironmentConfig){
    new AwsCdkS3Stack(app,env)
}