import { ValidationError } from "class-validator";

import { FieldError } from "../types/errors/FieldError";

export const mapToFieldError = (errors: ValidationError[]): FieldError[] => {
  return errors.map(toFieldError);
};

const toFieldError = ({ property, constraints }: ValidationError) => ({
  field: property,
  message: constraints
    ? (Object.values(constraints)[0] as string)
    : "unknown error",
});
