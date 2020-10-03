import React from "react";
import { CertificationProviderTable } from "../../components/certifications/CertificationProviderTable";
import {
  CertificationProviders,
  useCertificationsProvidersQuery,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const ViewCertificationProvider: React.FC<{}> = () => {
  const [{ data, fetching }] = useCertificationsProvidersQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  return (
    <CertificationProviderTable
      loading={fetching}
      data={
        data?.certificationsProviders?.data?.items as CertificationProviders[]
      }
    />
  );
};

export default withAuth(ViewCertificationProvider, [UserRole.Admin]);
