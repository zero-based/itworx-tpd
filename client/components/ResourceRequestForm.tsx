import React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Form, Formik, FormikConfig } from "formik";
import {
  EmployeesProfiles,
  ResourceRequestInput,
  useManagersNamesQuery,
} from "../generated/graphql";
import { CheckBoxStr } from "./CheckBoxStr";
import { ComboboxField } from "./ComboBoxField";
import { DatePickerStr } from "./DatePickerStr";
import { InputField } from "./InputField";
import { Loading } from "./Loading";

interface ResourceRequestProps extends FormikConfig<ResourceRequestInput> {
  action: string;
}

export const ResourceRequestForm: React.FC<ResourceRequestProps> = ({
  action,
  ...props
}) => {
  const [css, theme] = useStyletron();

  const [{ data, fetching }] = useManagersNamesQuery();
  if (fetching || !data) return <Loading />;

  return (
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
              Resource Request
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
                options={data.managers}
                mapOptionToString={(option: EmployeesProfiles) => option.name}
              />

              <InputField name="function" label="Function" required />
              <InputField name="title" label="Title" required />
              <DatePickerStr label="Start Date" name="startDate" required />
              <DatePickerStr label="End Date" name="endDate" required />
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <InputField
                name="propability"
                label="Propability"
                required
                type="number"
              />

              <InputField
                name="percentage"
                label="Percentage"
                required
                type="number"
              />
              <InputField name="status" label="Status" required />
              <InputField
                name="assignedResource"
                label="Assigned Resource"
                required
              />
              <InputField
                name="actualPercentage"
                label="Actual Percentage"
                required
                type="number"
              />
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <InputField name="replacementFor" label="Replacement For" />
              <InputField
                name="requestsCount"
                label="Requests Count"
                type="number"
              />
              <InputField
                name="relatedOpportunity"
                label="Related Opportunity"
              />
              <InputField name="comments" label="Comments" />
              <br />
              <CheckBoxStr label="Core Team Member" name="coreTeamMember" />
              <CheckBoxStr label="Replacenement" name="replacenement" />

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
