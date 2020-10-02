import React from "react";
import { useRouter } from "next/dist/client/router";

import { Loading } from "../../../components/common/Loading";
import { ResourceRequestForm } from "../../../components/forms/ResourceRequestForm";
import {
  useResourceRequestQuery,
  UserRole,
  useUpdateResourceRequestMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useRouteId } from "../../../hooks/useRouteId";

const EditResourceRequest: React.FC<{}> = () => {
  const [, updateResourceRequest] = useUpdateResourceRequestMutation();
  const router = useRouter();
  const id = useRouteId();

  const [{ data, fetching }] = useResourceRequestQuery({
    variables: {
      referenceNumber: id,
    },
  });

  if (fetching) {
    return <Loading />;
  }

  if (!data?.resourceRequest?.data) {
    return <p>Could Not Find Resource Request</p>;
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

        const errors = response.data?.updateResourceRequest?.errors;
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

export default withAuth(EditResourceRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
