import React from "react";
import { Button } from "baseui/button";
import { CSVLink } from "react-csv";

import { PageLayout } from "../../components/common/PageLayout";
import { ReleaseRequestTable } from "../../components/requests/ReleaseRequestTable";
import { useReleaseRequestsQuery, UserRole } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const ViewReleaseRequest: React.FC<{}> = () => {
  const [{ data, fetching }] = useReleaseRequestsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  const requests = data?.releaseRequests.data?.items;

  const csvHeaders = [
    { label: "Reference Number", key: "referenceNumber" },
    { label: "Manager Name", key: "managerName" },
    { label: "Employee Name", key: "employeeName" },
    { label: "Employee ID", key: "employeeId" },
    { label: "Employee Title", key: "employeeTitle" },
    { label: "Function", key: "function" },
    { label: "Release Date", key: "releaseDate" },
    { label: "Probability", key: "probability" },
    { label: "Release Percentage", key: "releasePercentage" },
    { label: "Release Reason", key: "releaseReason" },
    { label: "Leaving", key: "leaving" },
    { label: "Request Status", key: "requestStatus" },
  ];

  return (
    <PageLayout
      title="Release Request"
      loading={fetching}
      error={!!data?.releaseRequests?.errors}
      contentStyle={{ height: "65vh" }}
      action={
        requests ? (
          <Button>
            <CSVLink
              data={requests}
              filename="releaseRequests.csv"
              style={{ color: "white", textDecoration: "none" }}
              headers={csvHeaders}
            >
              Export
            </CSVLink>
          </Button>
        ) : null
      }
    >
      <ReleaseRequestTable data={requests} />
    </PageLayout>
  );
};

export default withAuth(ViewReleaseRequest, [UserRole.Admin, UserRole.Manager]);
