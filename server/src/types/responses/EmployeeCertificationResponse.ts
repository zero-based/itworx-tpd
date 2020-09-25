import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { FieldError } from "../errors/FieldError";
import { EmployeeCertifications } from "../../entities/EmployeeCertifications";

@ObjectType()
export class EmployeeCertificationResponse extends RegularResponse(
  FieldError,
  EmployeeCertifications
) {}
