import React from "react";
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

  return (
    <ReleaseRequestTable
      loading={fetching}
      data={data?.releaseRequests.data?.items}
    />
  );
};

export default withAuth(ViewReleaseRequest, [UserRole.Admin, UserRole.Manager]);
