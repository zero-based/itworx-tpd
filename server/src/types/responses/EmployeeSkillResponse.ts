import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { FieldError } from "../errors/FieldError";
import { EmployeeSkills } from "../../entities/EmployeeSkills";

@ObjectType()
export class EmployeeSkillResponse extends RegularResponse(
  FieldError,
  EmployeeSkills
) {}
