import { ObjectType } from "type-graphql";

import { Certifications } from "../../entities/Certifications";
import { FieldError } from "../errors/FieldError";
import RegularResponse from "./RegularResponse";

@ObjectType()
export class CertificationResponse extends RegularResponse(
  FieldError,
  Certifications
) {}
