import * as React from "react";

import { createUrqlClient } from "../../urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { ResourceRequestForm } from "../../components/ResourceRequestForm";
import {
  ResourceRequestInput,
  useCreateResourceRequestMutation,
} from "../../generated/graphql";
import { formatDate } from "../../utils/formatDate";
import { useRouter } from "next/dist/client/router";

interface ResourceRequestProps {}

const ResourceRequest: React.FC<ResourceRequestProps> = () => {
  const [, createResourceRequest] = useCreateResourceRequestMutation();
  const router = useRouter();

  const intialValues: ResourceRequestInput = {
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
      initialValues={{ ...intialValues }}
      onSubmit={async (values, { setErrors }) => {
        values.startDate =
          values.startDate === ""
            ? formatDate(new Date().toString())
            : values.startDate;
        values.endDate =
          values.endDate === ""
            ? formatDate(new Date().toString())
            : values.endDate;

        const response = await createResourceRequest({ input: values });
        const errors = response.data?.createResourceRequest.errors;
        console.log(response);

        if (errors) {
          var errorMap = errorMap(errors);
          setErrors(errorMap);
        } else {
          router.push("/");
        }
      }}
      action="Add"
    ></ResourceRequestForm>
  );
};

export default withUrqlClient(createUrqlClient)(ResourceRequest);
