import React from "react";

import { ReleaseRequestForm } from "../../components/ReleaseRequestForm";
import {
  ReleaseRequestInput,
  useCreateReleaseRequestMutation,
  UserRole,
} from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { withAuth } from "../../hocs/withAuth";

const CreateReleaseRequest: React.FC<{}> = () => {
  const [, createReleaseRequest] = useCreateReleaseRequestMutation();
  const router = useRouter();

  const initialValues: ReleaseRequestInput = {
    managerName: "",
    employeeName: "",
    employeeId: "",
    employeeTitle: "",
    function: "",
    releaseDate: "",
    propability: 0,
    releasePercentage: 0,
    releaseReason: "",
    leaving: "0",
    requestStatus: "",
  };

  return (
    <ReleaseRequestForm
      initialValues={{ ...initialValues }}
      action="Add"
      onSubmit={async (values, { setErrors }) => {
        const response = await createReleaseRequest({ input: values });
        const errors = response.data?.createReleaseRequest?.errors;

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

export default withAuth(CreateReleaseRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
