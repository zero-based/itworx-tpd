import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { PaginatedResourceRequests } from "../objects/PaginatedResourceRequestObject";
import { FieldError } from "../errors/FieldError";

@ObjectType()
export class PaginatedResourceResponse extends RegularResponse(
  FieldError,
  PaginatedResourceRequests
) {}
