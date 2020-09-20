import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ResourceRequestInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  managerName: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  function: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  title: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  startDate: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  endDate: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  propability: number;

  @IsNotEmpty({ message: "required field" })
  @Field()
  percentage: number;

  @IsNotEmpty({ message: "required field" })
  @Field()
  status: string;

  @Field({ nullable: true })
  coreTeamMember?: string;

  @Field({ nullable: true })
  replacenement?: string;

  @Field({ nullable: true })
  replacementFor?: string;

  @Field({ nullable: true })
  requestsCount?: number;

  @Field({ nullable: true })
  relatedOpportunity?: string;

  @Field({ nullable: true })
  comments?: string;

  @Field({ nullable: true })
  assignedResource?: string;

  @Field({ nullable: true })
  actualPercentage?: number;
}
