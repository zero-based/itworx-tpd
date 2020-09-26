import * as React from "react";

import { createUrqlClient } from "../../urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { ResourceRequestForm } from "../../components/ResourceRequestForm";
import {
  ResourceRequestInput,
  useCreateResourceRequestMutation,
} from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";

interface ResourceRequestProps {}

const ResourceRequest: React.FC<ResourceRequestProps> = () => {
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
          var errorMap = errorMap(errors);
          setErrors(errorMap);
        } else {
          router.push("/");
        }
      }}
    />
  );
};

export default withUrqlClient(createUrqlClient)(ResourceRequest);
