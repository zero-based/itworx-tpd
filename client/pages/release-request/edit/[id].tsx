import React from "react";
import { useRouter } from "next/router";

import { PageLayout } from "../../../components/common/PageLayout";
import { ReleaseRequestForm } from "../../../components/requests/ReleaseRequestForm";
import {
  EmployeesProfiles,
  ReleaseRequestInput,
  useManagersNamesQuery,
  useReleaseRequestQuery,
  UserRole,
  useUpdateReleaseRequestMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { useRouteId } from "../../../hooks/useRouteId";
import { toErrorMap } from "../../../utils/toErrorMap";

const EditReleaseRequest: React.FC<{}> = () => {
  const [, updateReleaseRequest] = useUpdateReleaseRequestMutation();
  const router = useRouter();
  const id = useRouteId();

  const [
    { data: releaseRequestData, fetching: releaseRequestFetching },
  ] = useReleaseRequestQuery({
    variables: {
      referenceNumber: id,
    },
  });

  const releaseRequest = releaseRequestData?.releaseRequest?.data;

  const [
    { data: managersData, fetching: managersFetching },
  ] = useManagersNamesQuery();

  return (
    <PageLayout
      title="Release Request"
      loading={releaseRequestFetching || managersFetching}
      error={!releaseRequest || !managersData?.managers}
    >
      <ReleaseRequestForm
        action="Update"
        managers={managersData?.managers as EmployeesProfiles[]}
        initialValues={releaseRequest as ReleaseRequestInput}
        onSubmit={async (values, { setErrors }) => {
          const response = await updateReleaseRequest({
            referenceNumber: id,
            input: values,
          });
          const errors = response.data?.updateReleaseRequest?.errors;

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

export default withAuth(EditReleaseRequest, [UserRole.Admin, UserRole.Manager]);
