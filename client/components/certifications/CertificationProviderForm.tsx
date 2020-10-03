import React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";

import { InputField } from "../fields/InputField";
import { CertificationProviderInput } from "../../graphql/types";

interface CertificationProviderFormProps
  extends FormikConfig<CertificationProviderInput> {
  action: string;
}

export const CertificationProviderForm: React.FC<CertificationProviderFormProps> = ({
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
            flexGridColumnCount={1}
          >
            <FlexGridItem>
              <InputField
                name="certificationProviderName"
                label="Certification Provider Name"
                required
              />
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
