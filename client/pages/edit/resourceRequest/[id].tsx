import * as React from "react";

import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import { createUrqlClient } from "../../../urql/createUrqlClient";
import {
  useResourceRequestQuery,
  useUpdateResourceRequestMutation,
} from "../../../generated/graphql";
import { MainLayout } from "../../../components/MainLayout";
import { ResourceRequestForm } from "../../../components/ResourceRequestForm";
import { formatDate } from "../../../utils/formatDate";

interface updateResourceRequestProps {}

const updateResourceRequest: React.FC<updateResourceRequestProps> = () => {
  const router = useRouter();
  const [, updateResourceRequest] = useUpdateResourceRequestMutation();

  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching }] = useResourceRequestQuery({
    variables: {
      referenceNumber: id,
    },
  });

  if (fetching) {
    return (
      <MainLayout>
        <div>loading...</div>
      </MainLayout>
    );
  }

  if (!data?.resourceRequest?.data) {
    return (
      <MainLayout>
        <p>Could Not Find Resource Request</p>
      </MainLayout>
    );
  }
  const {
    referenceNumber,
    __typename,
    ...formData
  } = data?.resourceRequest?.data;
  return (
    <ResourceRequestForm
      initialValues={{
        ...formData,
      }}
      action="Update"
      onSubmit={async (values, { setErrors }) => {
        values.startDate =
          values.startDate === ""
            ? formatDate(new Date().toString())
            : values.startDate;
        values.endDate =
          values.endDate === ""
            ? formatDate(new Date().toString())
            : values.endDate;

        const response = await updateResourceRequest({
          referenceNumber: referenceNumber,
          input: values,
        });
        console.log("responseee :", response);

        const errors = response.data?.updateResourceRequest.errors;
        if (errors) {
          var errorMap = errorMap(errors);
          setErrors(errorMap);
        } else {
          router.push("/");
        }
      }}
    ></ResourceRequestForm>
  );
};

export default withUrqlClient(createUrqlClient)(updateResourceRequest);
