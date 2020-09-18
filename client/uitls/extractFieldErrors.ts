import { CombinedError } from "urql";
import { FieldError } from "./types/FieldError";

export const extractFieldErrors = (error: CombinedError): FieldError[] => {
  const errors: any = error.graphQLErrors[0];
  return errors as FieldError[];
};
