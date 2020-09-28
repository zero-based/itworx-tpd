import React from "react";
import { FormControl } from "baseui/form-control";
import { Textarea, TextareaProps } from "baseui/textarea";
import { useField } from "formik";

interface TextAreaFieldProps extends TextareaProps {
  label: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  const [field, { error }] = useField<string>(props.name!);
  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <Textarea {...field} {...props} />
    </FormControl>
  );
};
