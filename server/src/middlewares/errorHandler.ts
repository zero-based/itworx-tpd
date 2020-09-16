import { InvalidCredentialsError } from "../errors/InvalidCredentials";

import { ArgumentValidationError } from "type-graphql";
import { GraphQLError } from "graphql";
import { ValidationError } from "apollo-server-express";

export const errorHandler = (error: GraphQLError) => {
  if (error.originalError instanceof ArgumentValidationError) {
    const validationErrors = error.extensions!.exception.validationErrors;
    return validationErrors.map(
      ({ property, constraints }: ValidationError): FieldError => ({
        field: property,
        message: constraints
          ? (Object.values(constraints)[0] as string)
          : "unknown error",
      })
    );
  } else if (error.originalError instanceof InvalidCredentialsError) {
    const property = error.originalError.property;
    return {
      field: property,
      message: "incorrect " + property,
    } as FieldError;
  }
  return error;
};
