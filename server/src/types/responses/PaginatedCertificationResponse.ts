import { ObjectType } from "type-graphql";

import { Certifications } from "../../entities/Certifications";
import { FieldError } from "../errors/FieldError";
import RegularPaginatedResponse from "./RegularPaginatedResponse";

@ObjectType()
export class PaginatedCertificationResponse extends RegularPaginatedResponse(
  FieldError,
  Certifications
) {}
