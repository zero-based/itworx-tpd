import React from "react";
import { useRouter } from "next/router";

import { ResourceRequestForm } from "../../components/requests/ResourceRequestForm";
import {
  EmployeesProfiles,
  ResourceRequestInput,
  useCreateResourceRequestMutation,
  useManagersNamesQuery,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import { PageLayout } from "../../components/common/PageLayout";

const CreateResourceRequest: React.FC<{}> = () => {
  const [, createResourceRequest] = useCreateResourceRequestMutation();
  const router = useRouter();

  const initialValues: ResourceRequestInput = {
    managerName: "",
    function: "",
    title: "",
    startDate: "",
    endDate: "",
    probability: 0,
    percentage: 0,
    status: "",
    coreTeamMember: "0",
    replacement: "0",
    requestsCount: 0,
    replacementFor: "",
    relatedOpportunity: "",
    comments: "",
    assignedResource: "",
    actualPercentage: 0,
  };

  const [{ data, fetching }] = useManagersNamesQuery();

  return (
    <PageLayout
      title="Resource Request"
      loading={fetching}
      error={!data?.managers}
    >
      <ResourceRequestForm
        action="Add"
        managers={data?.managers as EmployeesProfiles[]}
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await createResourceRequest({ input: values });
          const errors = response.data?.createResourceRequest.errors;

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

export default withAuth(CreateResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
