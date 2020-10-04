import React from "react";
import { useRouter } from "next/router";

import { ResourceRequestForm } from "../../components/requests/ResourceRequestForm";
import {
  EmployeesProfiles,
  ResourceRequestInput,
  useCreateResourceRequestMutation,
  useEmployeesProfilesQuery,
  useManagersNamesQuery,
  useMeQuery,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import { PageLayout } from "../../components/common/PageLayout";
import { formatDate } from "../../utils/formatDate";

const CreateResourceRequest: React.FC<{}> = () => {
  const [, createResourceRequest] = useCreateResourceRequestMutation();

  const router = useRouter();

  const initialValues: ResourceRequestInput = {
    managerName: "",
    function: "",
    title: "",
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    probability: 10, // minimum
    percentage: 10, // minimum
    status: "",
    coreTeamMember: "0",
    replacement: "0",
    requestsCount: 1,
    replacementFor: "",
    relatedOpportunity: "",
    comments: "",
    assignedResource: "",
    actualPercentage: 10, // minimum
  };

  const [{ data: meData }] = useMeQuery();
  const [
    { data: managersNamesData, fetching: managersNameFetching },
  ] = useManagersNamesQuery();

  const [
    { data: employeesProfilesData, fetching: employeesProfilesFetching },
  ] = useEmployeesProfilesQuery();

  return (
    <PageLayout
      title="Resource Request"
      loading={managersNameFetching || employeesProfilesFetching}
      error={
        !managersNamesData?.managers || !employeesProfilesData || !meData?.me
      }
    >
      <ResourceRequestForm
        action="Add"
        me={meData?.me as EmployeesProfiles}
        profileData={
          employeesProfilesData?.employeesProfiles as EmployeesProfiles[]
        }
        managers={managersNamesData?.managers as EmployeesProfiles[]}
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          values.status = "Open";
          const response = await createResourceRequest({ input: values });
          const errors = response.data?.createResourceRequest.errors;
          if (errors) {
            var errorMap = toErrorMap(errors);
            setErrors(errorMap);
          } else {
            router.push("/resource-request");
          }
        }}
      />
    </PageLayout>
  );
};

export default withAuth(CreateResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
