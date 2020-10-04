import React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";

import {
  EmployeesProfiles,
  ResourceRequestInput,
  useManagerEmployeesQuery,
  UserRole,
} from "../../graphql/types";
import { CheckBoxStrField } from "../fields/CheckBoxStrField";
import { ComboboxField } from "../fields/ComboBoxField";
import { DatePickerStrField } from "../fields/DatePickerStrField";
import { InputField } from "../fields/InputField";

interface ResourceRequestProps extends FormikConfig<ResourceRequestInput> {
  action: string;
  managers: EmployeesProfiles[];
  profileData: Pick<EmployeesProfiles, "function" | "title">[];
  me: EmployeesProfiles;
  role?: UserRole;
}

export const ResourceRequestForm: React.FC<ResourceRequestProps> = ({
  action,
  me,
  role,
  profileData,
  ...props
}) => {
  // pre-defined values
  props.initialValues.managerName = me.name;
  props.initialValues.function = me.function;
  props.initialValues.title = me.title;

  const options = profileData.map((ep) => ({
    function: ep.function,
    title: ep.title,
  }));

  const [replacementChecked, setReplacement] = React.useState(
    props.initialValues.replacement
  );

  // Get Manager's Employees For replacement
  const [managerId, setManagerId] = React.useState(me.id);
  const [{ data: managerEmployeesData }] = useManagerEmployeesQuery({
    variables: {
      directManagerId: managerId,
    },
  });
  const managerEmployees = managerEmployeesData?.managerEmployees ?? [
    {
      name: "",
    },
  ];

  const statusOptions =
    role === UserRole.Admin
      ? [
          "Open",
          "Cancelled",
          "On Hold",
          "Moved",
          "Pending Hiring Request",
          "Hired",
          "Pending Outsourcing Request",
          "Outsourced",
          "Over allocated",
        ]
      : ["Open", "Cancelled"];

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
                onItemChanged={(item) => {
                  setManagerId(!item ? "" : item.id);
                }}
              />
              <ComboboxField
                name="function"
                label="Function"
                items={options}
                mapItemToString={(item) => item.function}
              />
              <ComboboxField
                name="title"
                label="Job Title"
                items={options}
                mapItemToString={(item) => item.title}
              />
              <DatePickerStrField
                label="Start Date"
                name="startDate"
                required
              />
              {action === "Update" ? (
                <ComboboxField
                  name="status"
                  label="Status"
                  items={statusOptions}
                  mapItemToString={(item) => item}
                />
              ) : null}
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
              <InputField
                name="requestsCount"
                label="Requests Count"
                type="number"
              />
              <DatePickerStrField label="End Date" name="endDate" required />
              {action === "Update" && role === UserRole.Admin ? (
                <InputField name="assignedResource" label="Assigned Resource" />
              ) : null}
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <InputField
                name="relatedOpportunity"
                label="Related Opportunity"
              />
              <InputField name="comments" label="Comments" />

              {replacementChecked === "1" ? (
                <ComboboxField
                  name="replacementFor"
                  label="Replacement For"
                  items={managerEmployees}
                  mapItemToString={(item) => item.name}
                />
              ) : null}

              {action === "Update" && role === UserRole.Admin ? (
                <InputField
                  name="actualPercentage"
                  label="Actual Percentage"
                  required
                  type="number"
                />
              ) : null}

              <br />
              <CheckBoxStrField
                label="Core Team Member"
                name="coreTeamMember"
              />
              <CheckBoxStrField
                label="Replacement"
                name="replacement"
                onChecked={(checked) => {
                  setReplacement(checked);
                }}
              />

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
