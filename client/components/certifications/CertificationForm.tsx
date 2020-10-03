import * as React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";
import { HeadingLevel, Heading } from "baseui/heading";
import { useStyletron } from "baseui";

import { Loading } from "../common/Loading";
import { ComboboxField } from "../fields/ComboBoxField";
import { InputField } from "../fields/InputField";
import {
  CertificationInput,
  CertificationProviders,
  useCertificationsProvidersQuery,
} from "../../graphql/types";

interface CertificationFormProps extends FormikConfig<CertificationInput> {
  action: string;
  providers: CertificationProviders[];
}

export const CertificationForm: React.FC<CertificationFormProps> = ({
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
            flexGridColumnCount={[1, 1, 2, 2]}
          >
            <FlexGridItem>
              <InputField
                name="certificationName"
                label="Certification Name"
                required
              />
            </FlexGridItem>

            <FlexGridItem>
              <ComboboxField
                name="certificationProviderName"
                label="Certification Provider"
                items={props.providers}
                mapItemToString={(item) => item.certificationProviderName}
              />
            </FlexGridItem>

            <FlexGridItem />
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
