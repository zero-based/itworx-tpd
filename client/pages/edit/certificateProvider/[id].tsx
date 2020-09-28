import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificateProviderForm } from "../../../components/CertificateProviderForm";
import { Loading } from "../../../components/Loading";
import { MainLayout } from "../../../components/MainLayout";
import {
  useCertificateProviderQuery,
  UserRole,
  useUpdateCertificationProviderMutation,
} from "../../../generated/graphql";
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
  const certificationProvider = data?.certificateProvider?.data;

  if (fetching) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  if (certificationProvider === undefined) {
    return <p> Undefined </p>;
  }
  return (
    <MainLayout>
      <CertificateProviderForm
        initialValues={{
          certificationProviderName:
            certificationProvider.certificationProviderName,
        }}
        action="Update"
        onSubmit={async (values) => {
          await updateCertificationProvider({
            certificationProviderId:
              certificationProvider.certificatoinProviderId,
            certificationProviderName: values.certificationProviderName,
          });
          router.push("/view/certificateProviders");
        }}
      ></CertificateProviderForm>
    </MainLayout>
  );
};

export default withAuth(EditCertificationProvider, [UserRole.Admin]);
