import { ClassType, Field, ObjectType } from "type-graphql";

export interface IResponse<E, T> {
  errors?: E[];
  data?: T;
}

export default function RegularResponse<E, T>(
  EClass: ClassType<E>,
  TClass: ClassType<T>
) {
  @ObjectType({ isAbstract: true })
  abstract class RegularResponseClass implements IResponse<E, T> {
    @Field(() => [EClass], { nullable: true })
    errors?: E[];
    @Field(() => TClass, { nullable: true })
    data?: T;
  }

  return RegularResponseClass;
}
