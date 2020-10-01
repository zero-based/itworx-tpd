import * as React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificationForm } from "../../components/forms/CertificationForm";
import { useCreateCertificationMutation } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

interface CertificationProps {}

const CreateCertification: React.FC<CertificationProps> = () => {
  const router = useRouter();
  const [, createCertification] = useCreateCertificationMutation();
  return (
    <CertificationForm
      initialValues={{
        certificationProviderName: "",
        certificationName: "",
      }}
      action="Add"
      onSubmit={async (values) => {
        await createCertification({
          input: {
            certificationName: values.certificationName,
            certificationProviderName: values.certificationProviderName,
          },
        });
        router.push("/view/certifications");
      }}
    />
  );
};

export default withAuth(CreateCertification);
