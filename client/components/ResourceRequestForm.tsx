import * as React from "react";

import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Form, Formik, FormikConfig } from "formik";
import { useRouter } from "next/dist/client/router";
import { ResourceRequestInput } from "../generated/graphql";
import { CheckBoxStr } from "./CheckBoxStr";
import { DatePickerStr } from "./DatePickerStr";
import { InputField } from "./InputField";
import { MainLayout } from "./MainLayout";

interface ResourceRequestProps extends FormikConfig<ResourceRequestInput> {
  action: string;
}

export const ResourceRequestForm: React.FC<ResourceRequestProps> = ({
  action,
  ...props
}) => {
  const router = useRouter();

  return (
    <MainLayout>
      <Formik {...props}>
        {({ isSubmitting }) => (
          <Form>
            <HeadingLevel>
              <Heading
                styleLevel={2}
                $style={{
                  paddingLeft: "10%",
                  paddingTop: "5%",
                  color: "#C63527",
                }}
              >
                Resource Request
              </Heading>
            </HeadingLevel>

            <FlexGrid
              flexGridColumnGap="scale1000"
              flexGridRowGap="scale800"
              flexGridColumnCount={[1, 1, 2, 3]}
              $style={{
                margin: "auto",
                padding: "2% 10% 10%",
              }}
            >
              <FlexGridItem
                $style={{
                  display: "flex",
                  alignItems: "center",
                  marginBlock: "10%",
                }}
              >
                <InputField name="managerName" label="Manager Name" required />
                <br />
                <InputField name="function" label="Function" required />
                <br />
                <InputField name="title" label="Title" />
                <br />

                <DatePickerStr label="Start Date" name="startDate" required />
                <br />
                <DatePickerStr label="End Date" name="endDate" required />
              </FlexGridItem>

              <FlexGridItem
                $style={{
                  display: "flex",
                  alignItems: "center",
                  marginBlock: "10%",
                }}
              >
                <InputField
                  name="propability"
                  label="Propability"
                  required
                  type="number"
                />
                <br />

                <InputField
                  name="percentage"
                  label="Percentage"
                  required
                  type="number"
                />
                <br />

                <InputField name="status" label="Status" required />
                <br />

                <InputField
                  name="assignedResource"
                  label="Assigned Resource"
                  required
                />
                <br />

                <InputField
                  name="actualPercentage"
                  label="Actual Percentage"
                  required
                  type="number"
                />
              </FlexGridItem>

              <FlexGridItem
                $style={{
                  display: "flex",
                  alignItems: "center",
                  marginBlock: "10%",
                }}
              >
                <InputField name="replacementFor" label="Replacement For" />
                <br />

                <InputField
                  name="requestsCount"
                  label="Requests Count"
                  type="number"
                />
                <br />

                <InputField
                  name="relatedOpportunity"
                  label="Related Opportunity"
                />
                <br />

                <InputField name="comments" label="Comments" />
                <br />
                <br />

                <CheckBoxStr
                  label="Core Team Member"
                  name="coreTeamMember"
                ></CheckBoxStr>
                <br />

                <CheckBoxStr
                  label="Replacenement"
                  name="replacenement"
                ></CheckBoxStr>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  $style={{
                    marginTop: "48px",
                    position: "absolute",
                    right: "10%",
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
