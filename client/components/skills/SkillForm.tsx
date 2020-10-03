import React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";
import { SkillInput } from "../../graphql/types";
import { InputField } from "../fields/InputField";

interface SkillFormProps extends FormikConfig<SkillInput> {
  action: string;
}

export const SkillForm: React.FC<SkillFormProps> = ({ action, ...props }) => {
  return (
    <Formik {...props}>
      {({ isSubmitting }) => (
        <Form>
          <FlexGrid
            flexGridColumnGap="scale1000"
            flexGridRowGap="scale800"
            flexGridColumnCount={1}
          >
            <FlexGridItem>
              <InputField name="skillName" label="Skill Name" required />
            </FlexGridItem>

            <FlexGridItem display="flex">
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
