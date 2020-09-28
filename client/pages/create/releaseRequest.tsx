import React from "react";
import { useRouter } from "next/dist/client/router";

import { MainLayout } from "../../components/common/MainLayout";
import { ReleaseRequestForm } from "../../components/forms/ReleaseRequestForm";
import {
  ReleaseRequestInput,
  useCreateReleaseRequestMutation,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";

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
    <MainLayout>
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
    </MainLayout>
  );
};

export default withAuth(CreateReleaseRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
