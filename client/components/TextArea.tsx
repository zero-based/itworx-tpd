import { FormControl } from "baseui/form-control";
import { Textarea, TextareaProps } from "baseui/textarea";
import { useField } from "formik";
import React from "react";

interface TextAreaProps extends TextareaProps {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const [field, { error }, { setValue }] = useField<string>(props.name!);
  console.log("ya raaaabb", field.value);
  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <Textarea
        {...field}
        {...props}
        value={field.value}
        rows={6}
        onChange={(e) => {
          field.value = e.currentTarget.value;
          setValue(e.currentTarget.value);
        }}
      />
    </FormControl>
  );
};
