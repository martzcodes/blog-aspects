import { App, Aspects } from "aws-cdk-lib";
import { MyCDKStack } from "../lib/MyCDKStack";
import { EnableVersioningAspect } from "../lib/EnableVersioningAspect";
import { Match, Template } from "aws-cdk-lib/assertions";

test("Bucket does not have versioning without aspect", () => {
  const app = new App();
  const stack = new MyCDKStack(app, "MyTestStack");
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::S3::Bucket", 1);
  template.resourcePropertiesCountIs(
    "AWS::S3::Bucket",
    Match.serializedJson({
      VersioningConfiguration: Match.absent(),
    }),
    0
  );
  expect(template).toMatchSnapshot();
});

test("Bucket does have versioning with aspect", () => {
  const app = new App();
  const stack = new MyCDKStack(app, "MyTestStack");
  Aspects.of(stack).add(new EnableVersioningAspect());
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::S3::Bucket", 1);
  template.resourcePropertiesCountIs(
    "AWS::S3::Bucket",
    {
      VersioningConfiguration: { Status: "Enabled" },
    },
    1
  );
  expect(template).toMatchSnapshot();
});
