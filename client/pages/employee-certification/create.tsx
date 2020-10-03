import React from "react";
import { useRouter } from "next/dist/client/router";

import { EmployeeCertificationForm } from "../../components/certifications/EmployeeCertificationForm";
import {
  EmployeeCertificationInput,
  useCreateEmployeeCertificationMutation,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";

const CreateEmployeeCertification: React.FC<{}> = () => {
  const [
    ,
    createEmployeeCertification,
  ] = useCreateEmployeeCertificationMutation();
  const router = useRouter();

  const initialValues: EmployeeCertificationInput = {
    certificationProvider: "",
    certificationName: "",
    expirationDate: "",
  };

  return (
    <EmployeeCertificationForm
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const response = await createEmployeeCertification({ input: values });
        const errors = response.data?.createEmployeeCertification.errors;
        if (errors) {
          var errorMap = toErrorMap(errors);
          setErrors(errorMap);
        } else {
          router.push("/");
        }
      }}
      action="Add"
    />
  );
};

export default withAuth(CreateEmployeeCertification);
