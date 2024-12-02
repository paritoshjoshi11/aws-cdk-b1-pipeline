import {  commonTags, usRegion } from "./common/aws-account-constants"

export let EnvironmentTagUpperCase:{[key:string]:string} = {
    us : "US"
}

export class DeploymentConfigs {
    public readonly deploymentConfigs : Map<string, DeploymentConfig> = new Map([
        ["us",
            {
                accountTag : "prod",
                environmentTag : "us",
                accountRegion : usRegion,
                tags : {
                    ...commonTags,
                    compliance: "true"
                }
            }
        ]
    ])
}

export interface DeploymentConfig {
    readonly accountTag : string,
    readonly environmentTag : string,
    readonly accountRegion : string,
    readonly tags : {[key : string] :string}
}