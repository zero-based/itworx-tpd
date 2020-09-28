import React from "react";
import { useField } from "formik";
import { Combobox, PropsT } from "baseui/ComboBox";
import { FormControl } from "baseui/form-control";
import { PartialBy } from "../utils/typeUtil";

interface ComboboxProps extends PartialBy<PropsT, "value"> {
  label: string;
}

export const ComboboxField: React.FC<ComboboxProps> = (props) => {
  const [field, { error }, { setValue }] = useField<string>(props.name!);
  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <Combobox
        {...field}
        {...props}
        value={field.value}
        onChange={(nextValue) => {
          setValue(nextValue);
        }}
      />
    </FormControl>
  );
};
