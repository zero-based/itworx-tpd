import React from "react";
import { CertificationTable } from "../../components/certifications/CertificationTable";
import { PageLayout } from "../../components/common/PageLayout";
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
    <PageLayout
      title="Certifications"
      loading={fetching}
      error={!!data?.certifications?.errors}
      contentStyle={{ height: "65vh" }}
    >
      <CertificationTable
        data={data?.certifications?.data?.items as Certifications[]}
      />
    </PageLayout>
  );
};

export default withAuth(ViewCertification, [UserRole.Admin]);
