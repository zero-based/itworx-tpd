import React from "react";
import { useRouter } from "next/router";

import { EmployeeCertificationForm } from "../../../components/certifications/EmployeeCertificationForm";
import {
  CertificationProviders,
  EmployeeCertificationInput,
  useCertificationsProvidersQuery,
  useEmployeeCertificationQuery,
  useUpdateEmployeeCertificationMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useRouteId } from "../../../hooks/useRouteId";
import { PageLayout } from "../../../components/common/PageLayout";

const EditEmployeeCertification: React.FC<{}> = () => {
  const router = useRouter();
  const [, updateCertification] = useUpdateEmployeeCertificationMutation();

  const id = useRouteId();
  const [
    { data: certificationData, fetching: certificationFetching },
  ] = useEmployeeCertificationQuery({
    variables: {
      certificationId: id,
    },
  });

  const employeeCertification = certificationData?.employeeCertification?.data;
  const certification = employeeCertification?.certification;
  const provider = certification?.certificationProvider;
  const initialValues: EmployeeCertificationInput = {
    certificationName: certification?.certificationName ?? "",
    expirationDate: employeeCertification?.expirationDate ?? "",
    certificationProvider: provider?.certificationProviderName ?? "",
  };

  const [
    { data: providersData, fetching: providersFetching },
  ] = useCertificationsProvidersQuery({
    variables: {
      limit: 30,
      cursor: "0",
    },
  });

  const providers = providersData?.certificationsProviders?.data;

  return (
    <PageLayout
      title="Certification"
      loading={certificationFetching || providersFetching}
      error={!employeeCertification || !providers}
      errorMessage={"Certification not found"}
    >
      <EmployeeCertificationForm
        action="Update"
        initialCertificationProviderId={provider?.certificationProviderId}
        providers={providers?.items as CertificationProviders[]}
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await updateCertification({
            certificationId: id,
            input: values,
          });

          const errors = response.data?.updateEmployeeCertification?.errors;
          if (errors) {
            var errorMap = toErrorMap(errors);
            setErrors(errorMap);
          } else {
            router.push("/");
          }
        }}
      />
    </PageLayout>
  );
};

export default withAuth(EditEmployeeCertification);
