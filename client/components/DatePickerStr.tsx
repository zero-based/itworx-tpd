import * as React from "react";

import { FormControl } from "baseui/form-control";
import { InputProps } from "baseui/input";
import { DatePicker } from "baseui/datepicker";
import { useField } from "formik";
import { formatDate } from "../utils/formatDate";

/**
 * Returns DatePicker value.
 *
 * @param {string} props Initial values.
 * @return {string} DatePicker value.
 */

interface DatePickerStrProps extends InputProps {
  label: string;
}

export const DatePickerStr: React.FC<DatePickerStrProps> = (props) => {
  const [field, { error }, { setValue }] = useField<string>(props.name!);
  var value = field.value === "" ? [new Date()] : [new Date(field.value)];

  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <DatePicker
        {...field}
        value={value}
        onChange={({ date }) => {
          field.value = formatDate(date.toString());
          setValue(field.value);
        }}
      />
    </FormControl>
  );
};
