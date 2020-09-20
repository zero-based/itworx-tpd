import { ObjectType } from "type-graphql";

import RegularPaginatedResponse from "./RegularPaginatedResponse";
import { FieldError } from "../errors/FieldError";
import { ReleaseRequests } from "../../entities/ReleaseRequests";

@ObjectType()
export class PaginatedReleaseRequestResponse extends RegularPaginatedResponse(
  FieldError,
  ReleaseRequests
) {}
