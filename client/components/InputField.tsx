import React from "react";
import { useField } from "formik";
import { Input, InputProps } from "baseui/input";
import { FormControl } from "baseui/form-control";

interface InputFieldProps extends InputProps {
  label: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props.name!);
  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <Input {...field} {...props} />
    </FormControl>
  );
};
