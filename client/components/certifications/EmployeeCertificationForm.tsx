import React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik, FormikConfig } from "formik";

import { ComboboxField } from "../fields/ComboBoxField";
import {
  CertificationProviders,
  EmployeeCertificationInput,
  useCertificationProviderQuery,
} from "../../graphql/types";
import { DatePickerStrField } from "../fields/DatePickerStrField";

interface EmployeeCertificationFormProps
  extends FormikConfig<EmployeeCertificationInput> {
  action: string;
  initialCertificationProviderId?: number;
  providers: CertificationProviders[];
}

export const EmployeeCertificationForm: React.FC<EmployeeCertificationFormProps> = ({
  action,
  initialCertificationProviderId,
  ...props
}) => {
  const [certificationProviderId, setCertificationProviderId] = React.useState(
    initialCertificationProviderId ?? -1
  );

  const [{ data }] = useCertificationProviderQuery({
    variables: {
      certificationProviderId: certificationProviderId,
    },
  });

  const certifications = data?.certificationProvider?.data?.certifications;

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
                name="certificationProvider"
                label="Certification Provider"
                items={props.providers}
                mapItemToString={(item) => item.certificationProviderName}
                onItemChanged={(item) => {
                  setCertificationProviderId(
                    !item ? -1 : item.certificationProviderId
                  );
                }}
              />
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <ComboboxField
                name="certificationName"
                label="Certification Name"
                items={certifications ?? []}
                mapItemToString={(item) => item.certificationName}
              />
            </FlexGridItem>

            <FlexGridItem display="flex" flexDirection="column">
              <DatePickerStrField
                name="expirationDate"
                label="Expiration Date"
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
