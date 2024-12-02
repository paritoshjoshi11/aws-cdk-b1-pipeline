# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Project Struture

Project
├── bin
│   └── aws-cdk-b1-level-proj.ts
├── lib
│   ├── config
│   │   ├── common
│   │   │   ├── aws-account-constants.ts
│   │   │   ├── s3-bucket-config.ts
│   │   │   └── s3-bucket-policy-config.ts
│   │   └── s3-config.ts
│   └── stack
│       ├── global-stack.ts
│       └── s3-stack.ts
└── README.md

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
