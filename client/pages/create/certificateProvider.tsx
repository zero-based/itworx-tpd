import * as React from "react";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";

import { CertificateProviderForm } from "../../components/CertificateProviderForm";
import { MainLayout } from "../../components/MainLayout";
import { createUrqlClient } from "../../urql/createUrqlClient";
import { useCreateCertificationProviderMutation } from "../../generated/graphql";

interface CertificationProviderProps {}

const CreateCertificationProvider: React.FC<CertificationProviderProps> = () => {
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

export default withUrqlClient(createUrqlClient)(CreateCertificationProvider);
