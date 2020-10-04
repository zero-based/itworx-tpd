import React from "react";
import { useRouter } from "next/router";

import { ReleaseRequestForm } from "../../components/requests/ReleaseRequestForm";
import {
  EmployeesProfiles,
  ReleaseRequestInput,
  useCreateReleaseRequestMutation,
  useManagersNamesQuery,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import { PageLayout } from "../../components/common/PageLayout";
import { formatDate } from "../../utils/formatDate";

const CreateReleaseRequest: React.FC<{}> = () => {
  const [, createReleaseRequest] = useCreateReleaseRequestMutation();
  const router = useRouter();

  const initialValues: ReleaseRequestInput = {
    managerName: "",
    employeeName: "",
    employeeId: "",
    employeeTitle: "",
    function: "",
    releaseDate: formatDate(new Date()),
    probability: 0,
    releasePercentage: 0,
    releaseReason: "",
    leaving: "0",
    requestStatus: "",
  };

  const [{ data, fetching }] = useManagersNamesQuery();

  return (
    <PageLayout
      title="Release Request"
      loading={fetching}
      error={!data?.managers}
    >
      <ReleaseRequestForm
        action="Add"
        managers={data?.managers as EmployeesProfiles[]}
        initialValues={initialValues}
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
      />
    </PageLayout>
  );
};

export default withAuth(CreateReleaseRequest, [
  UserRole.Admin,
  UserRole.Manager,
]);
