import React from "react";
import { useRouter } from "next/router";

import { ResourceRequestForm } from "../../../components/requests/ResourceRequestForm";
import {
  EmployeesProfiles,
  ResourceRequestInput,
  ResourceRequests,
  useEmployeesProfilesQuery,
  useManagersNamesQuery,
  useMeQuery,
  useResourceRequestQuery,
  useRoleQuery,
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
  const [{ data: meData, fetching: meFetching }] = useMeQuery();
  const [{ data: roleData }] = useRoleQuery();

  const id = useRouteId();
  const [
    { data: resourceRequestData, fetching: resourceRequestFetching },
  ] = useResourceRequestQuery({
    variables: {
      referenceNumber: id,
    },
  });

  const resourceRequest = resourceRequestData?.resourceRequest?.data;

  const getInitialValues = (r: ResourceRequests): ResourceRequestInput => {
    const { __typename, referenceNumber, ...initialValues } = r;
    return initialValues;
  };

  const [
    { data: managersData, fetching: managersFetching },
  ] = useManagersNamesQuery();

  const [
    { data: employeesProfilesData, fetching: employeesProfilesFetching },
  ] = useEmployeesProfilesQuery();
  return (
    <PageLayout
      title="Resource Request"
      loading={
        resourceRequestFetching ||
        managersFetching ||
        meFetching ||
        resourceRequestFetching ||
        employeesProfilesFetching
      }
      error={
        !resourceRequest ||
        !managersData?.managers ||
        !meData?.me ||
        !roleData?.role ||
        (roleData.role === UserRole.Manager &&
          resourceRequest.status !== "Open") ||
        (meData.me.name !== resourceRequest.managerName &&
          roleData.role === UserRole.Manager) ||
        !employeesProfilesData
      }
      errorMessage={"Resource Request not found"}
    >
      {resourceRequest ? (
        <ResourceRequestForm
          action="Update"
          me={meData?.me as EmployeesProfiles}
          profileData={
            employeesProfilesData?.employeesProfiles as Pick<
              EmployeesProfiles,
              "function" | "title"
            >[]
          }
          role={roleData?.role as UserRole}
          managers={managersData?.managers as EmployeesProfiles[]}
          initialValues={getInitialValues(resourceRequest)}
          onSubmit={async (values, { setErrors }) => {
            if (values.replacement === "0") {
              values.replacementFor = "";
            }

            const response = await updateResourceRequest({
              referenceNumber: id,
              input: values,
            });

            const errors = response.data?.updateResourceRequest?.errors;
            if (errors) {
              var errorMap = toErrorMap(errors);
              setErrors(errorMap);
            } else {
              router.push("/resource-request");
            }
          }}
        />
      ) : null}
    </PageLayout>
  );
};

export default withAuth(EditResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
