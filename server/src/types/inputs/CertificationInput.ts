import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CertificationInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  certificationName: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  certificationProviderName: string;
}
