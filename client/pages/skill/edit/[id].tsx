import React from "react";
import { useRouter } from "next/dist/client/router";

import { Loading } from "../../../components/common/Loading";
import { SkillForm } from "../../../components/forms/SkillForm";
import {
  UserRole,
  useSkillQuery,
  useUpdateSkillMutation,
} from "../../../graphql/types";
import { withAuth } from "../../../hocs/withAuth";
import { useRouteId } from "../../../hooks/useRouteId";

const EditSkill: React.FC<{}> = () => {
  const [, updateSkill] = useUpdateSkillMutation();
  const router = useRouter();
  const id = useRouteId();

  const [{ data, fetching }] = useSkillQuery({
    variables: {
      skillId: id,
    },
  });

  if (fetching) {
    return <Loading />;
  }

  if (!data?.skill?.data) {
    return <p>Could Not Find Skill</p>;
  }

  const skill = data?.skill?.data!;

  return (
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
  );
};

export default withAuth(EditSkill, [UserRole.Admin]);
