import { ResourceRequests } from "../../entities/ResourceRequests";
import { ObjectType } from "type-graphql";

import { FieldError } from "../errors/FieldError";
import RegularPaginatedResponse from "./RegularPaginatedResponse";

@ObjectType()
export class PaginatedResourceRequestResponse extends RegularPaginatedResponse(
  FieldError,
  ResourceRequests
) {}
