import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificateProviderForm } from "../../../components/CertificateProviderForm";
import { MainLayout } from "../../../components/MainLayout";
import {
  useCertificateProviderQuery,
  useUpdateCertificationProviderMutation,
} from "../../../generated/graphql";


const EditCertificationProvider: React.FC<{}> = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data }] = useCertificateProviderQuery({
    variables: {
      certificationProviderId: id,
    },
  });
  const [
    ,
    updateCertificationProvider,
  ] = useUpdateCertificationProviderMutation();
  const certificationProvider = data?.certificateProvider?.data;

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

export default EditCertificationProvider;
