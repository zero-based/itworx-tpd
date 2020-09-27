import React from "react";
import { useRouter } from "next/dist/client/router";
import { MainLayout } from "../../components/MainLayout";
import { SkillForm } from "../../components/SkillForm";
import { useCreateSkillMutation } from "../../generated/graphql";


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

export default CreateSkill;
