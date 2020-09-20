import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  return errors.reduce(
    (map, { field, message }) => ((map[field] = message), map),
    {}
  );
};
