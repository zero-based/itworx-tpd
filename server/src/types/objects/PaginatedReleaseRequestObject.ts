import { ReleaseRequests } from "../../entities/ReleaseRequests";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedReleaseRequests {
  @Field(() => [ReleaseRequests])
  releaseRequests: ReleaseRequests[];

  @Field()
  hasMore: boolean;
}
