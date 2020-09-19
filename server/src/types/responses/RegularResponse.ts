import { ClassType, Field, ObjectType } from "type-graphql";

export default function RegularResponse<E, T>(
  EClass: ClassType<E>,
  TClass: ClassType<T>
) {
  @ObjectType({ isAbstract: true })
  abstract class RegularResponseClass {
    @Field(() => [EClass], { nullable: true })
    errors?: E[];
    @Field(() => TClass, { nullable: true })
    data?: T;
  }
  return RegularResponseClass;
}
