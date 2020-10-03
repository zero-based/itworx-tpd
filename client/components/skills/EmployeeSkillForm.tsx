import React from "react";

import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Form, Formik, FormikConfig } from "formik";
import {
  EmployeeSkillInput,
  Skills,
  useSkillsQuery,
} from "../../graphql/types";
import { Loading } from "../common/Loading";
import { ComboboxField } from "../fields/ComboBoxField";
import { DatePickerStrField } from "../fields/DatePickerStrField";
import { useStyletron } from "baseui";

interface EmployeeSkillFormProps extends FormikConfig<EmployeeSkillInput> {
  action: string;
}

export const EmployeeSkillForm: React.FC<EmployeeSkillFormProps> = ({
  action,
  ...props
}) => {
  const [css, theme] = useStyletron();

  const [{ data, fetching }] = useSkillsQuery({
    variables: {
      limit: 30,
      cursor: 0,
    },
  });
  if (fetching || !data?.skills?.data) return <Loading />;
  const employeeSkill = data.skills.data.items;

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
              Employee Skill
            </Heading>
          </HeadingLevel>

          <FlexGrid
            flexGridColumnGap="scale1000"
            flexGridRowGap="scale800"
            flexGridColumnCount={[1, 1, 2, 3]}
          >
            <FlexGridItem display="flex" flexDirection="column">
              <ComboboxField
                name="skillName"
                label="Skill Name"
                items={employeeSkill}
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
