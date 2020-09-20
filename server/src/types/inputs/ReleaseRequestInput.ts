import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ReleaseRequestInput {
  @IsNotEmpty({ message: "required field" })
  @Field()
  managerName: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  employeeName: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  employeeId: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  employeeTitle: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  function: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  releaseDate: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  propability: number;

  @IsNotEmpty({ message: "required field" })
  @Field()
  releasePercentage: number;

  @IsNotEmpty({ message: "required field" })
  @Field()
  releaseReason: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  leaving: string;

  @IsNotEmpty({ message: "required field" })
  @Field()
  requestStatus: string;
}
