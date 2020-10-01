import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SkillInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  skillName: string;
}
