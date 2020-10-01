import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificateProviderForm } from "../../../components/forms/CertificateProviderForm";
import { Loading } from "../../../components/common/Loading";
import {
  useCertificateProviderQuery,
  UserRole,
  useUpdateCertificationProviderMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";

const EditCertificationProvider: React.FC<{}> = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useCertificateProviderQuery({
    variables: {
      certificationProviderId: id,
    },
  });
  const [
    ,
    updateCertificationProvider,
  ] = useUpdateCertificationProviderMutation();

  if (fetching) {
    return <Loading />;
  }

  if (!data?.certificateProvider?.data) {
    return <p>Could Not Find Certification Provider</p>;
  }

  const certificationProvider = data?.certificateProvider?.data!;

  return (
    <CertificateProviderForm
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
        router.push("/view/certificateProviders");
      }}
    />
  );
};

export default withAuth(EditCertificationProvider, [UserRole.Admin]);
