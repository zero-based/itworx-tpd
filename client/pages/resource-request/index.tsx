import React from "react";
import { Button } from "baseui/button";
import { CSVLink } from "react-csv";

import { PageLayout } from "../../components/common/PageLayout";
import { ResourceRequestTable } from "../../components/requests/ResourceRequestTable";
import { useResourceRequestsQuery, UserRole } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const ViewResourceRequest: React.FC<{}> = () => {
  const [{ data, fetching }] = useResourceRequestsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  const requests = data?.resourceRequests.data?.items;

  const csvHeaders = [
    { label: "Reference Number", key: "referenceNumber" },
    { label: "Manager Name", key: "managerName" },
    { label: "Function", key: "function" },
    { label: "Title", key: "title" },
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
    { label: "Probability", key: "probability" },
    { label: "Percentage", key: "percentage" },
    { label: "Status", key: "status" },
    { label: "Core Team Member", key: "coreTeamMember" },
    { label: "Replacement", key: "replacement" },
    { label: "Replacement For", key: "replacementFor" },
    { label: "Requests Count", key: "requestsCount" },
    { label: "Related Opportunity", key: "relatedOpportunity" },
    { label: "Comments", key: "comments" },
    { label: "Assigned Resource", key: "assignedResource" },
    { label: "Actual Percentage", key: "actualPercentage" },
  ];

  return (
    <PageLayout
      title="Resource Requests"
      loading={fetching}
      error={!!data?.resourceRequests?.errors}
      contentStyle={{ height: "65vh" }}
      action={
        requests ? (
          <Button>
            <CSVLink
              headers={csvHeaders}
              data={requests}
              filename="ResourceRequests.csv"
              style={{ color: "white", textDecoration: "none" }}
            >
              Export
            </CSVLink>
          </Button>
        ) : null
      }
    >
      <ResourceRequestTable data={requests} />
    </PageLayout>
  );
};

export default withAuth(ViewResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
