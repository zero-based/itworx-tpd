import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { ResourceRequests } from "../../entities/ResourceRequests";
import { FieldError } from "../errors/FieldError";

@ObjectType()
export class ResourceRequestResponse extends RegularResponse(
  FieldError,
  ResourceRequests
) {}
