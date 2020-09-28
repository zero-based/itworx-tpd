import React from "react";
import { useRouter } from "next/dist/client/router";

import { Loading } from "../../../components/common/Loading";
import { MainLayout } from "../../../components/common/MainLayout";
import { ReleaseRequestForm } from "../../../components/forms/ReleaseRequestForm";
import {
  useReleaseRequestQuery,
  UserRole,
  useUpdateReleaseRequestMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";

const EditReleaseRequest: React.FC<{}> = () => {
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
        <Loading />
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
    <MainLayout>
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
          const errors = response.data?.updateReleaseRequest?.errors;

          if (errors) {
            var errorMap = toErrorMap(errors);
            setErrors(errorMap);
          } else {
            router.push("/");
          }
        }}
      ></ReleaseRequestForm>
    </MainLayout>
  );
};

export default withAuth(EditReleaseRequest, [UserRole.Admin, UserRole.Manager]);
