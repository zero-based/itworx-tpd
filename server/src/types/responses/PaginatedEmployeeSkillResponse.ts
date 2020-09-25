import { ObjectType } from "type-graphql";

import RegularPaginatedResponse from "./RegularPaginatedResponse";
import { FieldError } from "../errors/FieldError";
import { EmployeeSkills } from "../../entities/EmployeeSkills";

@ObjectType()
export class PaginatedEmployeeSkillResponse extends RegularPaginatedResponse(
  FieldError,
  EmployeeSkills
) {}
