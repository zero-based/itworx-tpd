import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificateProviderForm } from "../../components/CertificateProviderForm";
import { MainLayout } from "../../components/MainLayout";
import {
  useCreateCertificationProviderMutation,
  UserRole,
} from "../../generated/graphql";
import { withAuth } from "../../hocs/withAuth";

const CreateCertificationProvider: React.FC<{}> = () => {
  const router = useRouter();
  const [
    ,
    createCertificationProvider,
  ] = useCreateCertificationProviderMutation();
  return (
    <MainLayout>
      <CertificateProviderForm
        initialValues={{ certificationProviderName: "" }}
        action="Add"
        onSubmit={async (values) => {
          await createCertificationProvider({
            certificationProviderName: values.certificationProviderName,
          });
          router.push("/view/certificateProviders");
        }}
      >
        {" "}
      </CertificateProviderForm>
    </MainLayout>
  );
};

export default withAuth(CreateCertificationProvider, [UserRole.Admin]);
