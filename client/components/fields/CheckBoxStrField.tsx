import React from "react";
import { useField } from "formik";
import { Checkbox, CheckboxProps } from "baseui/checkbox";
import { FormControl } from "baseui/form-control";
import { PartialBy } from "../../utils/typeUtil";
import { PropsT } from "baseui/combobox";

interface CheckBoxStrFieldProps<T>
  extends PartialBy<PropsT<T>, "value" | "options" | "mapOptionToString"> {
  label: string;
  onChecked?: (item: string) => void;
}

/**
 * CheckBox Form Control that sets field value as "1" or "0"
 */
export function CheckBoxStrField<T>({
  onChecked = () => {},
  ...props
}: CheckBoxStrFieldProps<T>) {
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
          onChecked(invertedValue);
        }}
      >
        {props.label}
      </Checkbox>
    </FormControl>
  );
}
