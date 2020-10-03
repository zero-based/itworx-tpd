import React from "react";
import { useRouter } from "next/dist/client/router";

import { EmployeeSkillForm } from "../../components/skills/EmployeeSkillForm";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import {
  EmployeeSkillInput,
  useCreateEmployeeSkillMutation,
} from "../../graphql/types";

const CreateEmployeeSkill: React.FC<{}> = () => {
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

export default withAuth(CreateEmployeeSkill);
