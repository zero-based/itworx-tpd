import * as React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";
import { HeadingLevel, Heading } from "baseui/heading";

import { InputField } from "./InputField";

type CertificateProviderInput = {
  certificationProviderName: string;
};

interface CertificateProviderFormProps
  extends FormikConfig<CertificateProviderInput> {
  action: string;
}

export const CertificateProviderForm: React.FC<CertificateProviderFormProps> = ({
  action,
  ...props
}) => {
  return (
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
              {action} Certification Provider
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
              <InputField
                name="certificationProviderName"
                label="CertificationProvider Name"
                required
              />
            </FlexGridItem>

            <FlexGridItem
              $style={{
                display: "flex",
                alignItems: "center",
                marginBlock: "10%",
              }}
            ></FlexGridItem>

            <FlexGridItem
              $style={{
                display: "flex",
                alignItems: "center",
                marginBlock: "10%",
              }}
            >
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
  );
};
