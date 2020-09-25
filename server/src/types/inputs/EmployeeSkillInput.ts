import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class EmployeeSkillInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  skillName: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  experienceLevel: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  lastUsedDate: string;
}
