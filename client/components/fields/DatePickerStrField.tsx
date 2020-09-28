import React from "react";
import { FormControl } from "baseui/form-control";
import { DatePicker, DatepickerProps } from "baseui/datepicker";
import { useField } from "formik";

import { formatDate } from "../../utils/formatDate";

interface DatePickerStrFieldProps extends DatepickerProps {
  name: string;
  label: string;
}

/**
 * Form Control for dates that sets field value as a date string ""YYYY-MM-DD"
 */
export const DatePickerStrField: React.FC<DatePickerStrFieldProps> = (props) => {
  const [field, { error }, { setValue }] = useField<string>(props.name!);

  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <DatePicker
        {...field}
        {...props}
        formatString={"yyyy-MM-dd"}
        value={field.value === "" ? new Date() : new Date(field.value)}
        onChange={({ date }) => {
          const formattedDate = formatDate(date as Date);
          setValue(formattedDate);
        }}
      />
    </FormControl>
  );
};
