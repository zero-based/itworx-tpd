import React from "react";
import { useRouter } from "next/router";

import { CertificationForm } from "../../../components/certifications/CertificationForm";
import {
  CertificationProviders,
  useCertificationQuery,
  useCertificationsProvidersQuery,
  UserRole,
  useUpdateCertificationMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { useRouteId } from "../../../hooks/useRouteId";
import { PageLayout } from "../../../components/common/PageLayout";

const EditCertification: React.FC<{}> = () => {
  const router = useRouter();
  const [, updateCertification] = useUpdateCertificationMutation();

  const id = useRouteId();
  const [
    { data: certificationData, fetching: certificationFetching },
  ] = useCertificationQuery({
    variables: {
      certificationId: id,
    },
  });

  const certification = certificationData?.certification?.data;

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
      loading={certificationFetching || providersFetching}
      error={!certification || !providers}
      errorMessage={"Certification not found"}
    >
      {certification ? (
        <CertificationForm
          action="Update"
          providers={providers?.items as CertificationProviders[]}
          initialValues={{
            certificationName: certification.certificationName!,
            certificationProviderName: certification.certificationProvider
              ?.certificationProviderName!,
          }}
          onSubmit={async (values) => {
            await updateCertification({
              certificationId: id,
              input: values,
            });

            router.push("/certification");
          }}
        />
      ) : null}
    </PageLayout>
  );
};

export default withAuth(EditCertification, [UserRole.Admin]);
