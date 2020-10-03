import React from "react";
import { ResourceRequestTable } from "../../components/requests/ResourceRequestTable";
import {
  ResourceRequests,
  useResourceRequestsQuery,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const ViewResourceRequest: React.FC<{}> = () => {
  const [{ data, fetching }] = useResourceRequestsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  return (
    <ResourceRequestTable
      loading={fetching}
      data={data?.resourceRequests.data?.items}
    />
  );
};

export default withAuth(ViewResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
