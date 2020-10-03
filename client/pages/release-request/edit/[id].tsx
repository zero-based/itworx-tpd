import React from "react";
import { useRouter } from "next/dist/client/router";

import { Loading } from "../../../components/common/Loading";
import { ReleaseRequestForm } from "../../../components/requests/ReleaseRequestForm";
import {
  useReleaseRequestQuery,
  UserRole,
  useUpdateReleaseRequestMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useRouteId } from "../../../hooks/useRouteId";

const EditReleaseRequest: React.FC<{}> = () => {
  const [, updateReleaseRequest] = useUpdateReleaseRequestMutation();
  const router = useRouter();
  const id = useRouteId();

  const [{ data, fetching }] = useReleaseRequestQuery({
    variables: {
      referenceNumber: id,
    },
  });

  if (fetching) {
    return <Loading />;
  }

  if (!data?.releaseRequest?.data) {
    return <p>Could Not Find Release Request</p>;
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
        const errors = response.data?.updateReleaseRequest?.errors;

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

export default withAuth(EditReleaseRequest, [UserRole.Admin, UserRole.Manager]);
