import { useStyletron } from "baseui";
import { Button } from "baseui/button";

import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Form, Formik, FormikConfig } from "formik";
import * as React from "react";

import {
  ReleaseRequestInput,
  useManagersNamesQuery,
} from "../generated/graphql";
import { CheckBoxStr } from "./CheckBoxStr";
import { DatePickerStr } from "./DatePickerStr";
import { TextArea } from "./TextArea";

import { InputField } from "./InputField";
import { MainLayout } from "./MainLayout";
import { ComboboxField } from "./ComboBox";

interface ReleaseRequestProps extends FormikConfig<ReleaseRequestInput> {
  action: string;
}

export const ReleaseRequestForm: React.FC<ReleaseRequestProps> = ({
  action,
  ...props
}) => {
  const [css, theme] = useStyletron();
  const [{ data }] = useManagersNamesQuery();

  const managerMappedData = data?.managers?.map((manager) => ({
    label: manager.name,
  }));

  return (
    <MainLayout>
      <Formik {...props}>
        {({ isSubmitting }) => (
          <Form
            className={css({
              padding: "2% 5%",
            })}
          >
            <HeadingLevel>
              <Heading
                styleLevel={2}
                $style={{
                  color: theme.colors.primary,
                }}
              >
                Release Request
              </Heading>
            </HeadingLevel>

            <FlexGrid
              flexGridColumnGap="scale1000"
              flexGridRowGap="scale800"
              flexGridColumnCount={[1, 1, 2, 3]}
            >
              <FlexGridItem display="flex" flexDirection="column">
                <ComboboxField
                  name="managerName"
                  label="Manager Name"
                  options={
                    managerMappedData === undefined
                      ? [{ label: "" }]
                      : managerMappedData
                  }
                  required
                />

                <InputField
                  name="employeeName"
                  label="Employee Name"
                  required
                />
                <InputField name="employeeId" label="Employee ID" required />
                <DatePickerStr
                  name="releaseDate"
                  label="Release Date"
                  required
                ></DatePickerStr>
              </FlexGridItem>

              <FlexGridItem display="flex" flexDirection="column">
                <InputField
                  name="employeeTitle"
                  label="Employee Title"
                  required
                />
                <InputField name="function" label="Function" required />
                <TextArea
                  name="releaseReason"
                  label="Release Reason"
                  rows={6}
                  required
                />
              </FlexGridItem>

              <FlexGridItem display="flex" flexDirection="column">
                <InputField
                  name="propability"
                  label="Propability"
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
                <CheckBoxStr label="Leaving" name="leaving" />
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
    </MainLayout>
  );
};
