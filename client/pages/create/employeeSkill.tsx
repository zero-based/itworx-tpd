import React from "react";
import { useRouter } from "next/dist/client/router";

import { EmployeeSkillForm } from "../../components/forms/EmployeeSkillForm";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import {
  EmployeeSkillInput,
  useCreateEmployeeSkillMutation,
} from "../../graphql/types";

interface EmployeeSkillProps {}

const EmployeeSkill: React.FC<EmployeeSkillProps> = () => {
  const [, createEmployeeSkill] = useCreateEmployeeSkillMutation();
  const router = useRouter();

  const initialValues: EmployeeSkillInput = {
    skillName: "",
    experienceLevel: "",
    lastUsedDate: "",
  };
  return (
    <EmployeeSkillForm
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const response = await createEmployeeSkill({ input: values });
        const errors = response.data?.createEmployeeSkill.errors;
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

export default withAuth(EmployeeSkill);
