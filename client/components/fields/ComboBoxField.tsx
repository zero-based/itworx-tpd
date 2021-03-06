import React from "react";
import { useField } from "formik";
import { Combobox, PropsT } from "baseui/combobox";
import { FormControl } from "baseui/form-control";
import { PartialBy } from "../../utils/typeUtil";

interface ComboboxFieldProps<T>
  extends PartialBy<PropsT<T>, "value" | "options" | "mapOptionToString"> {
  label: string;
  items: T[];
  onItemChanged?: (item: T) => void;
  mapItemToString: (item: T) => string;
}

export function ComboboxField<T>({
  onItemChanged = () => {},
  ...props
}: ComboboxFieldProps<T>) {
  const [field, { error }, { setValue }] = useField<string>(props.name!);

  const filteredOptions = React.useMemo(() => {
    return props.items.filter((item) => {
      const itemAsString = props.mapItemToString(item);
      return itemAsString.toLowerCase().includes(field.value.toLowerCase());
    });
  }, [props.items, field.value]);

  return (
    <FormControl label={() => props.label} error={!!error ? error : null}>
      <Combobox
        {...field}
        {...props}
        options={filteredOptions}
        mapOptionToString={props.mapItemToString}
        value={field.value}
        onChange={(nextValue, option) => {
          setValue(nextValue);
          onItemChanged(option as T);
        }}
      />
    </FormControl>
  );
}
