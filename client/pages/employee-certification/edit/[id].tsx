import React from "react";
import { useRouter } from "next/dist/client/router";

import { Loading } from "../../../components/common/Loading";
import { EmployeeCertificationForm } from "../../../components/forms/EmployeeCertificationForm";
import {
  EmployeeCertificationInput,
  useEmployeeCertificationQuery,
  useUpdateEmployeeCertificationMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useRouteId } from "../../../hooks/useRouteId";

const EditEmployeeCertification: React.FC<{}> = () => {
  const [
    ,
    updateEmployeeCertification,
  ] = useUpdateEmployeeCertificationMutation();
  const router = useRouter();
  const id = useRouteId();

  const [{ data, fetching }] = useEmployeeCertificationQuery({
    variables: {
      certificationId: id,
    },
  });

  if (fetching) {
    return <Loading />;
  }

  const employeeCertification = data?.employeeCertification?.data;
  if (!employeeCertification) {
    return <p>Could Not Find This Certification</p>;
  }

  const certification = employeeCertification.certification;
  const initialValues: EmployeeCertificationInput = {
    certificationProvider:
      certification.certificationProvider.certificationProviderName,
    certificationName: certification.certificationName,
    expirationDate: employeeCertification.expirationDate ?? "",
  };

  return (
    <EmployeeCertificationForm
      intitalCertitficationProviderId={
        employeeCertification.certification.certificationProvider
          .certificationProviderId
      }
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const response = await updateEmployeeCertification({
          certificationId: employeeCertification?.certificationId,
          input: values,
        });
        const errors = response.data?.updateEmployeeCertification?.errors;
        if (errors) {
          var errorMap = toErrorMap(errors);
          setErrors(errorMap);
        } else {
          router.push("/");
        }
      }}
      action="Update"
    />
  );
};

export default withAuth(EditEmployeeCertification);
