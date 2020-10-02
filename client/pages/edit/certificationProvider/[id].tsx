import React from "react";
import { useRouter } from "next/dist/client/router";

import { CertificationProviderForm } from "../../../components/forms/CertificationProviderForm";
import { Loading } from "../../../components/common/Loading";
import {
  useCertificationProviderQuery,
  UserRole,
  useUpdateCertificationProviderMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";

const EditCertificationProvider: React.FC<{}> = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useCertificationProviderQuery({
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

  if (!data?.certificationProvider?.data) {
    return <p>Could Not Find Certification Provider</p>;
  }

  const certificationProvider = data?.certificationProvider?.data!;

  return (
    <CertificationProviderForm
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
        router.push("/view/certificationProviders");
      }}
    />
  );
};

export default withAuth(EditCertificationProvider, [UserRole.Admin]);
