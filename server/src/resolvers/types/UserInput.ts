import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @IsEmail({}, { message: "invalid email" })
  @Field()
  email: string;

  @MinLength(4)
  @Field()
  password: string;
}
