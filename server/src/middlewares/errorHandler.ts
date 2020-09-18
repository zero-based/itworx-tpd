import { ArgumentValidationError } from "type-graphql";
import { GraphQLError } from "graphql";
import { ValidationError } from "apollo-server-express";

import { InvalidCredentialsError } from "../errors/InvalidCredentials";

export const errorHandler = (error: GraphQLError): any => {
  return fieldErrorHandler(error) ?? error;
};

/**
 * Handles errors that are returned to the client as
 * FieldError to be used in forms.
 */
const fieldErrorHandler = (error: GraphQLError): FieldError[] | null => {
  var originalError = error.originalError;
  if (originalError instanceof ArgumentValidationError) {
    const validationErrors = error.extensions!.exception.validationErrors;
    return validationErrors.map(
      ({ property, constraints }: ValidationError) => ({
        field: property,
        message: constraints
          ? (Object.values(constraints)[0] as string)
          : "unknown error",
      })
    );
  } else if (originalError instanceof InvalidCredentialsError) {
    const property = originalError.property;
    return [
      {
        field: property,
        message: "incorrect " + property,
      },
    ];
  }

  return null;
};
