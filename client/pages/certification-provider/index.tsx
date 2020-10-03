import React from "react";
import { Button } from "baseui/button";
import { CSVLink } from "react-csv";

import { CertificationProviderTable } from "../../components/certifications/CertificationProviderTable";
import { PageLayout } from "../../components/common/PageLayout";
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

  const providers = data?.certificationsProviders?.data?.items;

  return (
    <PageLayout
      title="Certification Providers"
      loading={fetching}
      error={!!data?.certificationsProviders?.errors}
      contentStyle={{ height: "65vh" }}
      action={
        <Button>
          <CSVLink
            data={providers!}
            filename="CertificationProviders.csv"
            style={{ color: "white", textDecoration: "none" }}
          >
            Export
          </CSVLink>
        </Button>
      }
    >
      <CertificationProviderTable
        data={providers as CertificationProviders[]}
      />
    </PageLayout>
  );
};

export default withAuth(ViewCertificationProvider, [UserRole.Admin]);
