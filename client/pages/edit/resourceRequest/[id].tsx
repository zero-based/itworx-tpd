import React from "react";

import { useRouter } from "next/dist/client/router";
import { Loading } from "../../../components/Loading";
import { MainLayout } from "../../../components/MainLayout";
import { ResourceRequestForm } from "../../../components/ResourceRequestForm";
import {
  useResourceRequestQuery,
  UserRole,
  useUpdateResourceRequestMutation,
} from "../../../generated/graphql";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";

const EditResourceRequest: React.FC<{}> = () => {
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
        <Loading />
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
    <MainLayout>
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

          const errors = response.data?.updateResourceRequest?.errors;
          if (errors) {
            var errorMap = toErrorMap(errors);
            setErrors(errorMap);
          } else {
            router.push("/");
          }
        }}
      ></ResourceRequestForm>
    </MainLayout>
  );
};

export default withAuth(EditResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
