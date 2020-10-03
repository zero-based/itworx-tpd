import React from "react";
import { useRouter } from "next/router";

import { SkillForm } from "../../components/skills/SkillForm";
import { useCreateSkillMutation, UserRole } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { PageLayout } from "../../components/common/PageLayout";

const CreateSkill: React.FC<{}> = () => {
  const router = useRouter();
  const [, createSkill] = useCreateSkillMutation();

  return (
    <PageLayout title="Skill">
      <SkillForm
        action="Add"
        initialValues={{ skillName: "" }}
        onSubmit={async (values) => {
          await createSkill({ input: values });
          router.push("/skill");
        }}
      />
    </PageLayout>
  );
};

export default withAuth(CreateSkill, [UserRole.Admin]);
