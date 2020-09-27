import * as React from "react";

import { createUrqlClient } from "../../urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { ReleaseRequestForm } from "../../components/ReleaseRequestForm";
import {
  ReleaseRequestInput,
  useCreateReleaseRequestMutation,
} from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../../utils/toErrorMap";

interface ReleaseRequestProps {}

const ReleaseRequest: React.FC<ReleaseRequestProps> = () => {
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
        console.log(response);
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

export default withUrqlClient(createUrqlClient)(ReleaseRequest);
