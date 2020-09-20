import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { ReleaseRequests } from "../../entities/ReleaseRequests";
import { FieldError } from "../errors/FieldError";

@ObjectType()
export class ReleaseRequestResponse extends RegularResponse(
  FieldError,
  ReleaseRequests
) {}
