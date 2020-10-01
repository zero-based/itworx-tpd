import * as React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";
import { HeadingLevel, Heading } from "baseui/heading";
import { useStyletron } from "baseui";

import { ComboboxField } from "../fields/ComboBoxField";
import { InputField } from "../fields/InputField";
import {
  CertificationInput,
  useCertificationsProvidersQuery,
} from "../../graphql/types";

interface CertificationFormProps extends FormikConfig<CertificationInput> {
  action: string;
}

export const CertificationForm: React.FC<CertificationFormProps> = ({
  action,
  ...props
}) => {
  const [, theme] = useStyletron();
  const [{ data }] = useCertificationsProvidersQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });
  const options = data?.certificationsProviders?.data?.items.map((cp) => ({
    label: cp.certificationProviderName,
    id: cp.certificatoinProviderId,
  }));
  if (options === undefined) {
    return <p>No Providers Available !</p>;
  }
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
              {action} Certification
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
                name="certificationName"
                label="Certification Name"
                required
              />
            </FlexGridItem>

            <FlexGridItem
              $style={{
                display: "flex",
                alignItems: "center",
                marginBlock: "10%",
              }}
            >
              <ComboboxField
                name="certificateProviderName"
                label="Certification Provider"
                options={options}
                mapOptionToString={(option) => option.label}
              />
            </FlexGridItem>

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
                  backgroundColor: theme.colors.primary700,
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
