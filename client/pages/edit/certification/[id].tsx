import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificationForm } from "../../../components/forms/CertificationForm";
import {
  useCertificationQuery,
  UserRole,
  useUpdateCertificationMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { useRouteId } from "../../../hooks/useRouteId";

interface updateCertificationProps {}

const EditCertification: React.FC<updateCertificationProps> = () => {
  const [, updateCertification] = useUpdateCertificationMutation();
  const router = useRouter();
  const id = useRouteId();

  const [{ data }] = useCertificationQuery({
    variables: {
      certificationId: id,
    },
  });

  const certification = data?.certification?.data;

  if (certification === undefined) {
    return <p> Undefined </p>;
  }
  return (
    <CertificationForm
      initialValues={{
        certificationName: certification?.certificationName!,
        certificationProviderName: certification?.certificationProvider
          ?.certificationProviderName!,
      }}
      action="Update"
      onSubmit={async (values) => {
        await updateCertification({
          input: {
            certificationName: values.certificationName,
            certificationProviderName: values.certificationProviderName,
          },
          certificationId: certification?.certificationId!,
        });
        router.push("/view/certifications");
      }}
    />
  );
};

export default withAuth(EditCertification, [UserRole.Admin]);
