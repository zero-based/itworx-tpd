import { ResourceRequests } from "../../entities/ResourceRequests";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedResourceRequests {
  @Field(() => [ResourceRequests])
  resourceRequests: ResourceRequests[];

  @Field()
  hasMore: boolean;
}
