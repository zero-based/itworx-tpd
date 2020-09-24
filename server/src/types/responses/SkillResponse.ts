import { ObjectType } from "type-graphql";

import RegularResponse from "./RegularResponse";
import { FieldError } from "../errors/FieldError";
import { Skills } from "../../entities/Skills";

@ObjectType()
export class SkillResponse extends RegularResponse(FieldError, Skills) {}
