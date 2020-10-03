import React from "react";
import { CSVLink } from "react-csv";

import { Button } from "baseui/button";
import {
  Certifications,
  useCertificationsQuery,
  UserRole,
} from "../../graphql/types";
import { CertificationTable } from "../../components/certifications/CertificationTable";
import { PageLayout } from "../../components/common/PageLayout";
import { withAuth } from "../../hocs/withAuth";

const ViewCertification: React.FC<{}> = () => {
  const [{ data, fetching }] = useCertificationsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  const certifications = data?.certifications?.data?.items;

  const csvHeaders = [
    { label: "Certification Name", key: "certificationName" },
    {
      label: "Certification Provider",
      key: `certificationProvider.certificationProviderName`,
    },
    { label: "Talents Count", key: `employeeCertifications.length` },
  ];

  return (
    <PageLayout
      title="Certifications"
      loading={fetching}
      error={!!data?.certifications?.errors}
      contentStyle={{ height: "65vh" }}
      action={
        certifications ? (
          <Button>
            <CSVLink
              data={certifications}
              filename="Certifications.csv"
              style={{ color: "white", textDecoration: "none" }}
              headers={csvHeaders}
            >
              Export
            </CSVLink>
          </Button>
        ) : null
      }
    >
      <CertificationTable
        data={data?.certifications?.data?.items as Certifications[]}
      />
    </PageLayout>
  );
};

export default withAuth(ViewCertification, [UserRole.Admin]);
