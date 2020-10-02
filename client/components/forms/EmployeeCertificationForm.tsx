import React from "react";

import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Form, Formik, FormikConfig } from "formik";

import { Loading } from "../common/Loading";
import { useStyletron } from "baseui";
import { ComboboxField } from "../fields/ComboBoxField";
import {
  EmployeeCertificationInput,
  useCertificateProviderQuery,
  useCertificationsProvidersQuery,
} from "../../graphql/types";
import { DatePickerStrField } from "../fields/DatePickerStrField";

interface EmployeeCertificationFormProps
  extends FormikConfig<EmployeeCertificationInput> {
  action: string;
  intitalCertitficationProviderId?: number;
}

export const EmployeeCertificationForm: React.FC<EmployeeCertificationFormProps> = ({
  action,
  intitalCertitficationProviderId,
  ...props
}) => {
  const [css, theme] = useStyletron();

  // Certificate Provider
  const [certificationProviderId, setCertificationProviderId] = React.useState(
    intitalCertitficationProviderId ?? -1
  );

  const [
    {
      data: CertificationProviderData,
      fetching: certificationProviderFetching,
    },
  ] = useCertificationsProvidersQuery({
    variables: {
      limit: 30,
      cursor: "0",
    },
  });

  // Certifications
  const [{ data: certificationsData }] = useCertificateProviderQuery({
    variables: {
      certificationProviderId: certificationProviderId,
    },
  });
  const certificationsName = !certificationsData?.certificateProvider?.data
    ? [{ certificationName: "", certificationId: -1 }]
    : certificationsData.certificateProvider.data.certifications;

  if (certificationProviderFetching) return <Loading />;

  if (!CertificationProviderData?.certificationsProviders?.data)
    return <p> No Certificate Providers Avaliable yet !! </p>;

  const certificationProviders =
    CertificationProviderData.certificationsProviders.data.items;

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
              Employee Certification
            </Heading>
          </HeadingLevel>

          <FlexGrid
            flexGridColumnGap="scale1000"
            flexGridRowGap="scale800"
            flexGridColumnCount={[1, 1, 2, 3]}
          >
            <FlexGridItem display="flex" flexDirection="column">
              <ComboboxField
                name="certificateProvider"
                label="Certificate Provider"
                items={certificationProviders}
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
                items={certificationsName}
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
