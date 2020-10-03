import React from "react";

import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";
import {
  EmployeeSkillInput,
  Skills,
} from "../../graphql/types";
import { ComboboxField } from "../fields/ComboBoxField";
import { DatePickerStrField } from "../fields/DatePickerStrField";

interface EmployeeSkillFormProps extends FormikConfig<EmployeeSkillInput> {
  action: string;
  skills: Skills[];
}

export const EmployeeSkillForm: React.FC<EmployeeSkillFormProps> = ({
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
                name="skillName"
                label="Skill Name"
                items={props.skills}
                mapItemToString={(item) => item.skillName}
              />
            </FlexGridItem>
            <FlexGridItem display="flex" flexDirection="column">
              <ComboboxField
                name="experienceLevel"
                label="Experience Level"
                items={["Beginner", "Intermediate", "Expert"]}
                mapItemToString={(item) => item}
              />
            </FlexGridItem>
            <FlexGridItem display="flex" flexDirection="column">
              <DatePickerStrField
                label="Last Used Date"
                name="lastUsedDate"
                required
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
