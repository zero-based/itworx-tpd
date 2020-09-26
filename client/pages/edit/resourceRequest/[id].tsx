import React from "react";

import { Spinner } from "baseui/icon";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";

import { MainLayout } from "../../../components/MainLayout";
import { ResourceRequestForm } from "../../../components/ResourceRequestForm";
import {
  useResourceRequestQuery,
  useUpdateResourceRequestMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../urql/createUrqlClient";

interface updateResourceRequestProps {}

const updateResourceRequest: React.FC<updateResourceRequestProps> = () => {
  const [, updateResourceRequest] = useUpdateResourceRequestMutation();
  const router = useRouter();

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
        <Spinner />
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
      action="Update"
      initialValues={{
        ...formData,
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await updateResourceRequest({
          referenceNumber: referenceNumber,
          input: values,
        });

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
