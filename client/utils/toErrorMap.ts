import { FieldError } from "../generated/graphql";

type ErrorMap = { [key: string]: string };

export const toErrorMap = (errors: FieldError[]): ErrorMap => {
  return errors.reduce((map: ErrorMap, { field, message }) => {
    return (map[field] = message), map;
  }, {});
};
