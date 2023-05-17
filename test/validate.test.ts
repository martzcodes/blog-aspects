import { App, Aspects } from "aws-cdk-lib";
import { Annotations } from "aws-cdk-lib/assertions";
import { MyCDKStack } from "../lib/MyCDKStack";
import { ValidateVersioningAspect } from "../lib/ValidateVersioningAspect";

test("Synth throws an error because bucket is not versioned", () => {
  const app = new App();
  const stack = new MyCDKStack(app, "MyTestStack");
  Aspects.of(stack).add(new ValidateVersioningAspect());

  const annotations = Annotations.fromStack(stack);
  annotations.hasError("/MyTestStack/MyBucket/Resource", "Bucket versioning is not enabled");
  expect(annotations).toMatchSnapshot();
});
