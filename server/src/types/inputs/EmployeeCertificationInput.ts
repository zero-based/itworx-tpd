import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class EmployeeCertificationInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  certificationProvider: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  certificationName: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  expirationDate: string;
}
