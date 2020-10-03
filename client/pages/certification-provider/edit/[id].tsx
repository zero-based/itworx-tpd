import React from "react";
import { useRouter } from "next/router";

import { CertificationProviderForm } from "../../../components/certifications/CertificationProviderForm";
import { PageLayout } from "../../../components/common/PageLayout";
import {
  CertificationProviderInput,
  useCertificationProviderQuery,
  UserRole,
  useUpdateCertificationProviderMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { useRouteId } from "../../../hooks/useRouteId";

const EditCertificationProvider: React.FC<{}> = () => {
  const router = useRouter();
  const [, updateProvider] = useUpdateCertificationProviderMutation();

  const id = useRouteId();
  const [{ data, fetching }] = useCertificationProviderQuery({
    variables: {
      certificationProviderId: id,
    },
  });

  const provider = data?.certificationProvider?.data;
  const initialValues = provider as CertificationProviderInput;

  return (
    <PageLayout
      title="Certification Providers"
      loading={fetching}
      error={!data?.certificationProvider?.data}
      errorMessage={"Certification Provider not found"}
    >
      <CertificationProviderForm
        action="Update"
        initialValues={initialValues}
        onSubmit={async (values) => {
          await updateProvider({
            certificationProviderId: id,
            input: values,
          });

          router.push("/view/certificationProviders");
        }}
      />
    </PageLayout>
  );
};

export default withAuth(EditCertificationProvider, [UserRole.Admin]);
