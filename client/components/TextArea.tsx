import { FormControl } from "baseui/form-control";
import { Textarea, TextareaProps } from "baseui/textarea";
import { useField } from "formik";
import React from "react";

interface TextAreaProps extends TextareaProps {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const [field, { error }] = useField<string>(props.name!);
  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <Textarea {...field} {...props} />
    </FormControl>
  );
};
