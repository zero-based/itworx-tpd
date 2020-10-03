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
} from "../../graphql/types";
import { Loading } from "../common/Loading";
import { CheckBoxStrField } from "../fields/CheckBoxStrField";
import { ComboboxField } from "../fields/ComboBoxField";
import { DatePickerStrField } from "../fields/DatePickerStrField";
import { InputField } from "../fields/InputField";

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
                items={data.managers}
                mapItemToString={(item) => item.name}
              />
              <InputField name="function" label="Function" required />
              <InputField name="title" label="Title" required />
              <DatePickerStrField
                label="Start Date"
                name="startDate"
                required
              />
              <DatePickerStrField label="End Date" name="endDate" required />
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <InputField
                name="probability"
                label="Probability"
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
              <CheckBoxStrField
                label="Core Team Member"
                name="coreTeamMember"
              />
              <CheckBoxStrField label="Replacement" name="replacement" />

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
