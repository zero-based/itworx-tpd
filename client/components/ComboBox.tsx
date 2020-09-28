import React from "react";
import { useField } from "formik";
import { Combobox } from "baseui/ComboBox";
import { InputProps } from "baseui/input";
import { FormControl } from "baseui/form-control";

interface ComboboxProps extends InputProps {
  label: string;
  options: { label: string }[];
}

export const ComboboxField: React.FC<ComboboxProps> = (props) => {
  const [field, { error }, { setValue }] = useField<string>(props.name!);
  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <Combobox
        {...field}
        {...props}
        value={field.value}
        mapOptionToString={(option) => option.label}
        onChange={(nextValue) => {
          setValue(nextValue);
        }}
      />
    </FormControl>
  );
};
