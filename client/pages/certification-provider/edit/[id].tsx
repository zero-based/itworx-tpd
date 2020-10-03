import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificationProviderForm } from "../../../components/certifications/CertificationProviderForm";
import { Loading } from "../../../components/common/Loading";
import {
  useCertificationProviderQuery,
  UserRole,
  useUpdateCertificationProviderMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { useRouteId } from "../../../hooks/useRouteId";

const EditCertificationProvider: React.FC<{}> = () => {
  const [
    ,
    updateCertificationProvider,
  ] = useUpdateCertificationProviderMutation();
  const router = useRouter();
  const id = useRouteId();

  const [{ data, fetching }] = useCertificationProviderQuery({
    variables: {
      certificationProviderId: id,
    },
  });

  if (fetching) {
    return <Loading />;
  }

  if (!data?.certificationProvider?.data) {
    return <p>Could Not Find Certification Provider</p>;
  }

  const certificationProvider = data?.certificationProvider?.data!;

  return (
    <CertificationProviderForm
      initialValues={{
        certificationProviderName:
          certificationProvider.certificationProviderName,
      }}
      action="Update"
      onSubmit={async (values) => {
        await updateCertificationProvider({
          input: {
            certificationProviderName: values.certificationProviderName,
          },
          certificationProviderId:
            certificationProvider.certificationProviderId,
        });
        router.push("/view/certificationProviders");
      }}
    />
  );
};

export default withAuth(EditCertificationProvider, [UserRole.Admin]);
