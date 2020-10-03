import React from "react";
import { useRouter } from "next/router";

import { CertificationProviderForm } from "../../../components/certifications/CertificationProviderForm";
import { PageLayout } from "../../../components/common/PageLayout";
import {
  CertificationProviderInput,
  CertificationProviders,
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

  const getInitialValues = (
    p: CertificationProviders
  ): CertificationProviderInput => {
    const { __typename, certificationProviderId, ...initialValues } = p;
    return initialValues;
  };

  return (
    <PageLayout
      title="Certification Providers"
      loading={fetching}
      error={!data?.certificationProvider?.data}
      errorMessage={"Certification Provider not found"}
    >
      {provider ? (
        <CertificationProviderForm
          action="Update"
          initialValues={getInitialValues(provider as CertificationProviders)}
          onSubmit={async (values) => {
            await updateProvider({
              certificationProviderId: id,
              input: values,
            });

            router.push("/certification-provider");
          }}
        />
      ) : null}
    </PageLayout>
  );
};

export default withAuth(EditCertificationProvider, [UserRole.Admin]);
