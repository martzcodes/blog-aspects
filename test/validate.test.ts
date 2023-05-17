import { App, Aspects } from "aws-cdk-lib";
import { MyCDKStack } from "../lib/MyCDKStack";
import { ValidateVersioningAspect } from "../lib/ValidateVersioningAspect";
import { Template } from "aws-cdk-lib/assertions";

test("Synth throws an error because bucket is not versioned", () => {
  expect.assertions(1);
  const app = new App();
  const stack = new MyCDKStack(app, "MyTestStack");
  Aspects.of(stack).add(new ValidateVersioningAspect());
  try {
    Template.fromStack(stack);
  } catch (e: any) {
    expect(e.message).toMatch(/Bucket .* does not have versioning enabled/);
  }
});
