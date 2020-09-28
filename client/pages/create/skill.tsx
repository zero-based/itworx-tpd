import React from "react";
import { useRouter } from "next/dist/client/router";
import { MainLayout } from "../../components/common/MainLayout";
import { SkillForm } from "../../components/forms/SkillForm";
import { useCreateSkillMutation, UserRole } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const CreateSkill: React.FC<{}> = () => {
  const [, createSkill] = useCreateSkillMutation();
  const router = useRouter();

  return (
    <MainLayout>
      <SkillForm
        initialValues={{ skillName: "" }}
        action="Add"
        onSubmit={async (values) => {
          await createSkill({ skillName: values.skillName });
          router.push("/view/skills");
        }}
      >
        {" "}
      </SkillForm>
    </MainLayout>
  );
};

export default withAuth(CreateSkill, [UserRole.Admin]);
