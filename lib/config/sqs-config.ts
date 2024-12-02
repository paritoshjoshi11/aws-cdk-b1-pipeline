export interface SqsConfig {
    queueName: string;
    visibilityTimeout: number;
  }

export const sqsConfig = {
    queueName: "datalake-glue-queue",
    visibilityTimeout: 300, // 300 seconds (5 minutes)
  };
  
 