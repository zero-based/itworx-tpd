import { ObjectType } from "type-graphql";

import RegularPaginatedResponse from "./RegularPaginatedResponse";
import { FieldError } from "../errors/FieldError";
import { EmployeeCertifications } from "../../entities/EmployeeCertifications";

@ObjectType()
export class PaginatedEmployeeCertificationResponse extends RegularPaginatedResponse(
  FieldError,
  EmployeeCertifications
) {}
