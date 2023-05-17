import { App, Aspects } from "aws-cdk-lib";
import { MyCDKStack } from "../lib/MyCDKStack";
import { ValidateVersioningAspect } from "../lib/ValidateVersioningAspect";

const app = new App();
const stack = new MyCDKStack(app, "MyTestStack");
Aspects.of(stack).add(new ValidateVersioningAspect());