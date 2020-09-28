import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificateProviderForm } from "../../components/forms/CertificateProviderForm";
import {
  useCreateCertificationProviderMutation,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const CreateCertificationProvider: React.FC<{}> = () => {
  const router = useRouter();
  const [
    ,
    createCertificationProvider,
  ] = useCreateCertificationProviderMutation();
  return (
    <CertificateProviderForm
      initialValues={{ certificationProviderName: "" }}
      action="Add"
      onSubmit={async (values) => {
        await createCertificationProvider({
          certificationProviderName: values.certificationProviderName,
        });
        router.push("/view/certificateProviders");
      }}
    />
  );
};

export default withAuth(CreateCertificationProvider, [UserRole.Admin]);
