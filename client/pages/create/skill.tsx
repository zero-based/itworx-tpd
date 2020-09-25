import * as React from "react";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";

import { MainLayout } from "../../components/MainLayout";
import { SkillForm } from "../../components/SkillForm";
import { createUrqlClient } from "../../urql/createUrqlClient";
import { useCreateSkillMutation } from "../../generated/graphql";

interface SkillProps {}

const CreateSkill: React.FC<SkillProps> = () => {
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

export default withUrqlClient(createUrqlClient)(CreateSkill);
