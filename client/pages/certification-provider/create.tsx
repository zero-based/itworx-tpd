import React from "react";
import { useRouter } from "next/router";

import { CertificationProviderForm } from "../../components/certifications/CertificationProviderForm";
import {
  CertificationProviderInput,
  useCreateCertificationProviderMutation,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { PageLayout } from "../../components/common/PageLayout";

const CreateCertificationProvider: React.FC<{}> = () => {
  const router = useRouter();
  const [, createProvider] = useCreateCertificationProviderMutation();

  const initialValues: CertificationProviderInput = {
    certificationProviderName: "",
  };

  return (
    <PageLayout title="Certification Providers">
      <CertificationProviderForm
        action="Add"
        initialValues={initialValues}
        onSubmit={async (values) => {
          await createProvider({ input: values });
          router.push("/certification-provider");
        }}
      />
    </PageLayout>
  );
};

export default withAuth(CreateCertificationProvider, [UserRole.Admin]);
