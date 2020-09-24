import { ObjectType } from "type-graphql";

import RegularPaginatedResponse from "./RegularPaginatedResponse";
import { FieldError } from "../errors/FieldError";
import { Skills } from "../../entities/Skills";

@ObjectType()
export class PaginatedSkillResponse extends RegularPaginatedResponse(
  FieldError,
  Skills
) {}
