import React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Form, Formik, FormikConfig } from "formik";

import {
  ResourceRequestInput,
  useManagersNamesQuery,
} from "../generated/graphql";
import { CheckBoxStr } from "./CheckBoxStr";
import { DatePickerStr } from "./DatePickerStr";
import { InputField } from "./InputField";
import { MainLayout } from "./MainLayout";
import { useStyletron } from "baseui";
import { ComboboxField } from "./ComboBox";

interface ResourceRequestProps extends FormikConfig<ResourceRequestInput> {
  action: string;
}

export const ResourceRequestForm: React.FC<ResourceRequestProps> = ({
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
                  options={
                    managerMappedData === undefined
                      ? [{ label: "" }]
                      : managerMappedData
                  }
                  required
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
    </MainLayout>
  );
};
