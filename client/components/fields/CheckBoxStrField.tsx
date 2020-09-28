import React from "react";
import { useField } from "formik";
import { Checkbox, CheckboxProps } from "baseui/checkbox";
import { FormControl } from "baseui/form-control";

interface CheckBoxStrFieldProps extends CheckboxProps {
  label: string;
}

/**
 * CheckBox Form Control that sets field value as "1" or "0"
 */
export const CheckBoxStrField: React.FC<CheckBoxStrFieldProps> = (props) => {
  const [field, { error }, { setValue }] = useField<string>(props.name!);
  return (
    <FormControl error={!!error ? error : null}>
      <Checkbox
        {...field}
        {...props}
        error={!!error}
        checked={field.value === "1" ? true : false}
        onChange={() => {
          const invertedValue = field.value === "1" ? "0" : "1";
          setValue(invertedValue);
        }}
      >
        {props.label}
      </Checkbox>
    </FormControl>
  );
};
