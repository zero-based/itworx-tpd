import React from "react";
import { useRouter } from "next/dist/client/router";

import { Loading } from "../../../components/common/Loading";
import { EmployeeSkillForm } from "../../../components/forms/EmployeeSkillForm";
import {
  EmployeeSkillInput,
  useEmployeeSkillQuery,
  useUpdateEmployeeSkillMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";

const EditEmployeeSkill: React.FC<{}> = () => {
  const [, updateEmployeeSkill] = useUpdateEmployeeSkillMutation();
  const router = useRouter();

  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching }] = useEmployeeSkillQuery({
    variables: {
      skillId: id,
    },
  });
  if (fetching) {
    return <Loading />;
  }

  const skill = data?.employeeSkill?.data;
  if (!skill) {
    return <p>Could Not Find This Skill</p>;
  }

  const initialValues: EmployeeSkillInput = {
    skillName: skill.skill.skillName,
    experienceLevel: skill.experienceLevel,
    lastUsedDate: skill.lastUsedDate,
  };

  return (
    <EmployeeSkillForm
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const response = await updateEmployeeSkill({
          skillId: skill.skillId,
          input: values,
        });
        const errors = response.data?.updateEmployeeSkill?.errors;
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

export default withAuth(EditEmployeeSkill);
