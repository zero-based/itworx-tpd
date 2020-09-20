import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { PaginatedReleaseRequests } from "../objects/PaginatedReleaseRequestObject";
import { FieldError } from "../errors/FieldError";

@ObjectType()
export class PaginatedReleaseResponse extends RegularResponse(
  FieldError,
  PaginatedReleaseRequests
) {}
