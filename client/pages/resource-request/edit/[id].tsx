import React from "react";
import { useRouter } from "next/router";

import { ResourceRequestForm } from "../../../components/requests/ResourceRequestForm";
import {
  EmployeesProfiles,
  ResourceRequestInput,
  useManagersNamesQuery,
  useResourceRequestQuery,
  UserRole,
  useUpdateResourceRequestMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useRouteId } from "../../../hooks/useRouteId";
import { PageLayout } from "../../../components/common/PageLayout";

const EditResourceRequest: React.FC<{}> = () => {
  const router = useRouter();
  const [, updateResourceRequest] = useUpdateResourceRequestMutation();

  const id = useRouteId();
  const [
    { data: resourceRequestData, fetching: resourceRequestFetching },
  ] = useResourceRequestQuery({
    variables: {
      referenceNumber: id,
    },
  });

  const resourceRequest = resourceRequestData?.resourceRequest?.data;

  const [
    { data: managersData, fetching: managersFetching },
  ] = useManagersNamesQuery();

  return (
    <PageLayout
      title="Resource Request"
      loading={resourceRequestFetching || managersFetching}
      error={!resourceRequest || !managersData?.managers}
      errorMessage={"Resource Request not found"}
    >
      <ResourceRequestForm
        action="Update"
        managers={managersData?.managers as EmployeesProfiles[]}
        initialValues={
          resourceRequestData?.resourceRequest?.data as ResourceRequestInput
        }
        onSubmit={async (values, { setErrors }) => {
          const response = await updateResourceRequest({
            referenceNumber: id,
            input: values,
          });

          const errors = response.data?.updateResourceRequest?.errors;
          if (errors) {
            var errorMap = toErrorMap(errors);
            setErrors(errorMap);
          } else {
            router.push("/");
          }
        }}
      />
    </PageLayout>
  );
};

export default withAuth(EditResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
