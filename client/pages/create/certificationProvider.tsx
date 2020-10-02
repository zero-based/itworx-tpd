import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificationProviderForm } from "../../components/forms/CertificationProviderForm";
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
    <CertificationProviderForm
      initialValues={{ certificationProviderName: "" }}
      action="Add"
      onSubmit={async (values) => {
        await createCertificationProvider({
          input: {
            certificationProviderName: values.certificationProviderName,
          },
        });
        router.push("/view/certificationProviders");
      }}
    />
  );
};

export default withAuth(CreateCertificationProvider, [UserRole.Admin]);
