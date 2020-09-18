import { FormInstance } from "antd/lib/form";
import { FieldError } from "./types/FieldError";

export const mapErrorToField = (
  errors: FieldError[]
): Parameters<FormInstance["setFields"]>[0] => {
  return errors.map((error) => ({
    name: error.field,
    errors: [error.message],
  }));
};
