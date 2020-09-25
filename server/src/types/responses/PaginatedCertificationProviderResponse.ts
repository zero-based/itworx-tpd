import { ObjectType } from "type-graphql";

import { CertificationProviders } from "../../entities/CertificationProviders";
import { FieldError } from "../errors/FieldError";
import RegularPaginatedResponse from "./RegularPaginatedResponse";

@ObjectType()
export class PaginatedCertificationProviderResponse extends RegularPaginatedResponse(
  FieldError,
  CertificationProviders
) {}
