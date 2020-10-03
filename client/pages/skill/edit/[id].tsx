import React from "react";
import { useRouter } from "next/router";

import { SkillForm } from "../../../components/skills/SkillForm";
import {
  UserRole,
  useSkillQuery,
  useUpdateSkillMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { useRouteId } from "../../../hooks/useRouteId";
import { PageLayout } from "../../../components/common/PageLayout";

const EditSkill: React.FC<{}> = () => {
  const [, updateSkill] = useUpdateSkillMutation();
  const router = useRouter();
  const id = useRouteId();

  const [{ data, fetching }] = useSkillQuery({
    variables: {
      skillId: id,
    },
  });

  const skill = data?.skill?.data;

  return (
    <PageLayout
      title="Skill"
      loading={fetching}
      error={!skill}
      errorMessage={"Skill not found"}
    >
      {skill ? (
        <SkillForm
          action="Update"
          initialValues={{ skillName: skill.skillName }}
          onSubmit={async (values) => {
            await updateSkill({
              input: {
                skillName: values.skillName,
              },
              skillId: skill?.skillId,
            });
            router.push("/skill");
          }}
        />
      ) : null}
    </PageLayout>
  );
};

export default withAuth(EditSkill, [UserRole.Admin]);
