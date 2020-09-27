import * as React from "react";

import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import { createUrqlClient } from "../../../urql/createUrqlClient";
import {
  useReleaseRequestQuery,
  useUpdateReleaseRequestMutation,
} from "../../../generated/graphql";
import { MainLayout } from "../../../components/MainLayout";
import { ReleaseRequestForm } from "../../../components/ReleaseRequestForm";
import { toErrorMap } from "../../../utils/toErrorMap";
import { Spinner } from "baseui/icon";

interface updateReleaseRequestProps {}

const updateReleaseRequest: React.FC<updateReleaseRequestProps> = () => {
  const [, updateReleaseRequest] = useUpdateReleaseRequestMutation();
  const router = useRouter();

  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching }] = useReleaseRequestQuery({
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

  if (!data?.releaseRequest?.data) {
    return (
      <MainLayout>
        <p>Could Not Find Release Request</p>
      </MainLayout>
    );
  }
  const {
    referenceNumber,
    __typename,
    ...formData
  } = data?.releaseRequest?.data;

  return (
    <ReleaseRequestForm
      initialValues={{
        ...formData,
      }}
      action="Update"
      onSubmit={async (values, { setErrors }) => {
        const response = await updateReleaseRequest({
          referenceNumber: referenceNumber,
          input: values,
        });
        const errors = response.data?.updateReleaseRequest.errors;

        if (errors) {
          var errorMap = toErrorMap(errors);
          setErrors(errorMap);
        } else {
          router.push("/");
        }
      }}
    ></ReleaseRequestForm>
  );
};

export default withUrqlClient(createUrqlClient)(updateReleaseRequest);
