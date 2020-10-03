import React from "react";
import { useRouter } from "next/router";

import { EmployeeSkillForm } from "../../../components/skills/EmployeeSkillForm";
import {
  EmployeeSkillInput,
  Skills,
  useEmployeeSkillQuery,
  useSkillsQuery,
  useUpdateEmployeeSkillMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useRouteId } from "../../../hooks/useRouteId";
import { PageLayout } from "../../../components/common/PageLayout";

const EditEmployeeSkill: React.FC<{}> = () => {
  const router = useRouter();
  const [, updateEmployeeSkill] = useUpdateEmployeeSkillMutation();

  const id = useRouteId();
  const [
    { data: employeeSkillData, fetching: employeeSkillFetching },
  ] = useEmployeeSkillQuery({
    variables: {
      skillId: id,
    },
  });

  const employeeSkill = employeeSkillData?.employeeSkill?.data;
  const initialValues: EmployeeSkillInput = {
    skillName: employeeSkill?.skill.skillName ?? "",
    experienceLevel: employeeSkill?.experienceLevel ?? "",
    lastUsedDate: employeeSkill?.lastUsedDate ?? "",
  };

  const [{ data: skillsData, fetching: skillsFetching }] = useSkillsQuery({
    variables: {
      limit: 30,
      cursor: 0,
    },
  });

  const skills = skillsData?.skills.data;

  return (
    <PageLayout
      title="Skill"
      loading={employeeSkillFetching || skillsFetching}
      error={!employeeSkill || !skills}
      errorMessage={"Skill not found"}
    >
      <EmployeeSkillForm
        action="Update"
        skills={skills?.items as Skills[]}
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await updateEmployeeSkill({
            skillId: id,
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
      />
    </PageLayout>
  );
};

export default withAuth(EditEmployeeSkill);
