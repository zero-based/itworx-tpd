import React from "react";
import { useField, useFormikContext } from "formik";
import { InputProps } from "baseui/input";
import { Checkbox } from "baseui/checkbox";

/**
 * Returns Checkbox value either "0" or "1".
 *
 * @param {string} props Initial values.
 * @return {string} Checkbox value either "0" or "1".
 */

interface ChecboxStrProps extends InputProps {
  label: string;
}

export const CheckBoxStr: React.FC<ChecboxStrProps> = (props) => {
  const [field] = useField<string>(props.name!);
  const { setFieldValue } = useFormikContext();
  var value = field.value === "1" ? true : false;
  return (
    <Checkbox
      {...field}
      checked={value}
      onChange={() => {
        setFieldValue(field.name, !value ? "1" : "0");
        field.value = !value ? "1" : "0";
      }}
    >
      {props.label}
    </Checkbox>
  );
};
