import React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Form, Formik, FormikConfig } from "formik";

import {
  EmployeesProfiles,
  ReleaseRequestInput,
  useManagersNamesQuery,
} from "../../graphql/types";
import { Loading } from "../common/Loading";
import { CheckBoxStrField } from "../fields/CheckBoxStrField";
import { ComboboxField } from "../fields/ComboBoxField";
import { DatePickerStrField } from "../fields/DatePickerStrField";
import { InputField } from "../fields/InputField";
import { TextAreaField } from "../fields/TextAreaField";

interface ReleaseRequestProps extends FormikConfig<ReleaseRequestInput> {
  action: string;
  managers: EmployeesProfiles[];
}

export const ReleaseRequestForm: React.FC<ReleaseRequestProps> = ({
  action,
  ...props
}) => {
  return (
    <Formik {...props}>
      {({ isSubmitting }) => (
        <Form>
          <FlexGrid
            flexGridColumnGap="scale1000"
            flexGridRowGap="scale800"
            flexGridColumnCount={[1, 1, 2, 3]}
          >
            <FlexGridItem display="flex" flexDirection="column">
              <ComboboxField
                name="managerName"
                label="Manager Name"
                items={props.managers}
                mapItemToString={(item) => item.name}
              />
              <InputField name="employeeName" label="Employee Name" required />
              <InputField name="employeeId" label="Employee ID" required />
              <DatePickerStrField
                name="releaseDate"
                label="Release Date"
                required
              ></DatePickerStrField>
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <InputField
                name="employeeTitle"
                label="Employee Title"
                required
              />
              <InputField name="function" label="Function" required />
              <TextAreaField
                name="releaseReason"
                label="Release Reason"
                rows={6}
                required
              />
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <InputField
                name="probability"
                label="Probability"
                type="number"
                required
              />
              <InputField
                name="releasePercentage"
                label="Release Percentage"
                type="number"
                required
              />
              <InputField
                name="requestStatus"
                label="Request Status"
                required
              />
              <CheckBoxStrField label="Leaving" name="leaving" />
              <Button
                type="submit"
                isLoading={isSubmitting}
                $style={{
                  marginTop: "48px",
                  marginLeft: "auto",
                }}
              >
                {action}
              </Button>
            </FlexGridItem>
          </FlexGrid>
        </Form>
      )}
    </Formik>
  );
};
