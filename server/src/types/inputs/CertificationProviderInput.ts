import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CertificationProviderInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  certificationProviderName: string;
}
