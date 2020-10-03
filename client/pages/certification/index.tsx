import React from "react";
import { CertificationTable } from "../../components/certifications/CertificationTable";
import {
  Certifications,
  useCertificationsQuery,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const ViewCertification: React.FC<{}> = () => {
  const [{ data, fetching }] = useCertificationsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  return (
    <CertificationTable
      loading={fetching}
      data={data?.certifications?.data?.items as Certifications[]}
    />
  );
};

export default withAuth(ViewCertification, [UserRole.Admin]);
