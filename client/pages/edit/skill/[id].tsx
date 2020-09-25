import React from "react";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";

import { MainLayout } from "../../../components/MainLayout";
import { SkillForm } from "../../../components/SkillForm";
import { createUrqlClient } from "../../../urql/createUrqlClient";
import {
  useSkillQuery,
  useUpdateSkillMutation,
} from "../../../generated/graphql";

interface updateSkillProps {}

const updateSkillForm: React.FC<updateSkillProps> = () => {
  const [, updateSkill] = useUpdateSkillMutation();
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data }] = useSkillQuery({
    variables: {
      skillId: id,
    },
  });
  const skill = data?.skill?.data;

  if (skill === undefined) {
    return <p> Undefined </p>;
  }
  return (
    <MainLayout>
      <SkillForm
        action="Update"
        initialValues={{ skillName: skill.skillName }}
        onSubmit={async (values) => {
          await updateSkill({
            skillId: skill?.skillId,
            skillName: values.skillName,
          });
          router.push("/view/skills");
        }}
      ></SkillForm>
    </MainLayout>
  );
};

export default withUrqlClient(createUrqlClient)(updateSkillForm);
