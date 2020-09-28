import React from "react";
import { useRouter } from "next/dist/client/router";

import { ResourceRequestForm } from "../../components/forms/ResourceRequestForm";
import {
  ResourceRequestInput,
  useCreateResourceRequestMutation,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";

const CreateResourceRequest: React.FC<{}> = () => {
  const [, createResourceRequest] = useCreateResourceRequestMutation();
  const router = useRouter();

  const initialValues: ResourceRequestInput = {
    managerName: "",
    function: "",
    title: "",
    startDate: "",
    endDate: "",
    propability: 0,
    percentage: 0,
    status: "",
    coreTeamMember: "0",
    replacenement: "0",
    requestsCount: 0,
    replacementFor: "",
    relatedOpportunity: "",
    comments: "",
    assignedResource: "",
    actualPercentage: 0,
  };
  return (
    <ResourceRequestForm
      action="Add"
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
  );
};

export default withAuth(CreateResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
