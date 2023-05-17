import { App, Aspects } from "aws-cdk-lib";
import { MyCDKStack } from "../lib/MyCDKStack";
import { TokenAwareAspect } from "../lib/TokenAwareAspect";
import { Template } from "aws-cdk-lib/assertions";

test("Token Aware Aspect", () => {
  const app = new App();
  const stack = new MyCDKStack(app, "MyTestStack");
  Aspects.of(stack).add(new TokenAwareAspect());
  const spy = jest.spyOn(console, "log");
  Template.fromStack(stack);
  expect(spy).not.toHaveBeenCalledWith("Bucket name is MyBucket");
  expect(spy.mock.calls[0][0]).toMatch(/Bucket name is \${Token\[TOKEN\.\d+\]}/);
});
