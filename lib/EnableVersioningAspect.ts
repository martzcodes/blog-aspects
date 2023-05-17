import { IAspect, Tokenization } from "aws-cdk-lib";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";

export class EnableVersioningAspect implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof CfnBucket) {
      if (!node.versioningConfiguration
        || (!Tokenization.isResolvable(node.versioningConfiguration)
            && node.versioningConfiguration.status !== 'Enabled')) {
              node.versioningConfiguration = {
                status: 'Enabled'
              };
      }
    }
  }
}