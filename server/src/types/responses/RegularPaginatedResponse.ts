import { ClassType, Field, ObjectType } from "type-graphql";
import RegularResponse from "./RegularResponse";

export interface IPage<T> {
  hasMore: boolean;
  items: T[];
}

export default function RegularPaginatedResponse<E, T>(
  EClass: ClassType<E>,
  TClass: ClassType<T>
) {
  @ObjectType(`${TClass.name}Page`)
  class Page implements IPage<T> {
    @Field()
    hasMore: boolean;

    @Field(() => [TClass])
    items: T[];
  }

  return RegularResponse(EClass, Page);
}
