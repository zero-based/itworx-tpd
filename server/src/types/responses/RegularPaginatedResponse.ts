import { ClassType, Field, ObjectType } from "type-graphql";
import RegularResponse from "./RegularResponse";

export default function RegularPaginatedResponse<E, T>(
  EClass: ClassType<E>,
  TClass: ClassType<T>
) {
  @ObjectType(`${TClass.name}Page`)
  class Page {
    @Field()
    hasMore: boolean;

    @Field(() => [TClass])
    items: T[];
  }

  return RegularResponse(EClass, Page);
}
