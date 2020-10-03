import React from "react";
import { useRouter } from "next/router";

import { EmployeeCertificationForm } from "../../components/certifications/EmployeeCertificationForm";
import {
  CertificationProviders,
  EmployeeCertificationInput,
  useCertificationsProvidersQuery,
  useCreateEmployeeCertificationMutation,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import { PageLayout } from "../../components/common/PageLayout";

const CreateEmployeeCertification: React.FC<{}> = () => {
  const router = useRouter();
  const [, createCertification] = useCreateEmployeeCertificationMutation();

  const initialValues: EmployeeCertificationInput = {
    certificationProvider: "",
    certificationName: "",
    expirationDate: "",
  };

  const [{ data, fetching }] = useCertificationsProvidersQuery({
    variables: {
      limit: 30,
      cursor: "0",
    },
  });

  const providers = data?.certificationsProviders?.data;

  return (
    <PageLayout title="Certification" loading={fetching} error={!providers}>
      <EmployeeCertificationForm
        action="Add"
        providers={providers?.items as CertificationProviders[]}
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await createCertification({ input: values });
          const errors = response.data?.createEmployeeCertification.errors;
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

export default withAuth(CreateEmployeeCertification);
