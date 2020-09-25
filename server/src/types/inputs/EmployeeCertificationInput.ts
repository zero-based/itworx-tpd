import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class EmployeeCertificationInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  certificateProvider: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  certificateName: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  expirationDate: string;
}
