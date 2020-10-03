import { IsNotEmpty, Min, ValidateIf } from "class-validator";
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

  @Min(10)
  @Field()
  probability: number;

  @Min(10)
  @Field()
  percentage: number;

  @IsNotEmpty({ message: "required field" })
  @Field()
  status: string;

  @Field({ nullable: true })
  coreTeamMember?: string;

  @Field({ nullable: true })
  replacement?: string;

  @ValidateIf((o) => o.replacement === "1")
  @IsNotEmpty({ message: "required field" })
  @Field({ nullable: true })
  replacementFor?: string;

  @Field({ nullable: true })
  requestsCount?: number;

  @Field({ nullable: true })
  relatedOpportunity?: string;

  @Field({ nullable: true })
  comments?: string;

  @ValidateIf(
    (o) =>
      o.status === "Outsourced" ||
      o.status === "Moved" ||
      o.status === "Hired" ||
      o.status === "Over allocated"
  )
  @IsNotEmpty({ message: "required field" })
  @Field({ nullable: true })
  assignedResource?: string;

  @Min(10)
  @Field({ nullable: true })
  actualPercentage?: number;
}
