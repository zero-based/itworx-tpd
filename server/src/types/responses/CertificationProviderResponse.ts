import { ObjectType } from "type-graphql";

import { CertificationProviders } from "../../entities/CertificationProviders";
import { FieldError } from "../errors/FieldError";
import RegularResponse from "./RegularResponse";

@ObjectType()
export class CertificationProviderResponse extends RegularResponse(
  FieldError,
  CertificationProviders
) {}
