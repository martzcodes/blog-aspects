import { IAspect } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";

export class TokenAwareAspect implements IAspect {
  visit(node: IConstruct): void {
    if (node instanceof Bucket) {
      console.log(`Bucket name is ${node.bucketName}`);
    }
  }
}