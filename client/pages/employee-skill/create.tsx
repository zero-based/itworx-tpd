import React from "react";
import { useRouter } from "next/router";

import { EmployeeSkillForm } from "../../components/skills/EmployeeSkillForm";
import { withAuth } from "../../hocs/withAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import {
  EmployeeSkillInput,
  Skills,
  useCreateEmployeeSkillMutation,
  useSkillsQuery,
} from "../../graphql/types";
import { PageLayout } from "../../components/common/PageLayout";
import { formatDate } from "../../utils/formatDate";

const CreateEmployeeSkill: React.FC<{}> = () => {
  const [, createEmployeeSkill] = useCreateEmployeeSkillMutation();
  const router = useRouter();

  const initialValues: EmployeeSkillInput = {
    skillName: "",
    experienceLevel: "",
    lastUsedDate: formatDate(new Date()),
  };

  const [{ data, fetching }] = useSkillsQuery({
    variables: {
      limit: 30,
      cursor: 0,
    },
  });

  const skills = data?.skills.data;

  return (
    <PageLayout title="Skill" loading={fetching} error={!skills}>
      <EmployeeSkillForm
        action="Add"
        skills={skills?.items as Skills[]}
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
      />
    </PageLayout>
  );
};

export default withAuth(CreateEmployeeSkill);
