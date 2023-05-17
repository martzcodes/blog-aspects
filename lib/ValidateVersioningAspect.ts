import { IAspect } from "aws-cdk-lib";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";

export class ValidateVersioningAspect implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof CfnBucket && !node.versioningConfiguration) {
      throw new Error(`Bucket ${node.node.path} does not have versioning enabled`);
    }
  }
}