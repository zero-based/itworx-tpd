import React from "react";
import { useRouter } from "next/dist/client/router";

import { Loading } from "../../../components/Loading";
import { MainLayout } from "../../../components/MainLayout";
import { SkillForm } from "../../../components/SkillForm";
import {
  UserRole,
  useSkillQuery,
  useUpdateSkillMutation,
} from "../../../generated/graphql";
import { withAuth } from "../../../hocs/withAuth";

const EditSkill: React.FC<{}> = () => {
  const [, updateSkill] = useUpdateSkillMutation();
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useSkillQuery({
    variables: {
      skillId: id,
    },
  });

  if (fetching) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  if (!data?.skill?.data) {
    <MainLayout>
      <p>Could Not Find Skill</p>
    </MainLayout>;
  }

  const skill = data?.skill?.data!;

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

export default withAuth(EditSkill, [UserRole.Admin]);
