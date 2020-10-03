import React from "react";
import { useRouter } from "next/dist/client/router";

import { SkillForm } from "../../components/skills/SkillForm";
import { useCreateSkillMutation, UserRole } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const CreateSkill: React.FC<{}> = () => {
  const [, createSkill] = useCreateSkillMutation();
  const router = useRouter();

  return (
    <SkillForm
      initialValues={{ skillName: "" }}
      action="Add"
      onSubmit={async (values) => {
        await createSkill({ input: { skillName: values.skillName } });
        router.push("/skill");
      }}
    />
  );
};

export default withAuth(CreateSkill, [UserRole.Admin]);
