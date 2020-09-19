import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { EmployeesProfiles } from "../../entities/EmployeesProfiles";
import { FieldError } from "../errors/FieldError";

@ObjectType()
export class UserResponse extends RegularResponse(
  FieldError,
  EmployeesProfiles
) {}
