import React from "react";
import { useRouter } from "next/router";

import { CertificationForm } from "../../components/certifications/CertificationForm";
import {
  CertificationInput,
  CertificationProviders,
  useCertificationsProvidersQuery,
  useCreateCertificationMutation,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { PageLayout } from "../../components/common/PageLayout";

const CreateCertification: React.FC<{}> = () => {
  const router = useRouter();
  const [, createCertification] = useCreateCertificationMutation();

  const initialValues: CertificationInput = {
    certificationProviderName: "",
    certificationName: "",
  };

  const [
    { data: providersData, fetching: providersFetching },
  ] = useCertificationsProvidersQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  const providers = providersData?.certificationsProviders?.data;

  return (
    <PageLayout
      title="Certification"
      loading={providersFetching}
      error={!providers}
    >
      <CertificationForm
        action="Add"
        providers={providers?.items as CertificationProviders[]}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await createCertification({
            input: values,
          });
          router.push("/certification");
        }}
      />
    </PageLayout>
  );
};

export default withAuth(CreateCertification);
