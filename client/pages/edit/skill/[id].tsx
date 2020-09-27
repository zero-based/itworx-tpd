import React from "react";
import { useRouter } from "next/dist/client/router";

import { MainLayout } from "../../../components/MainLayout";
import { SkillForm } from "../../../components/SkillForm";
import { Loading } from "../../../components/Loading";
import {
  useSkillQuery,
  useUpdateSkillMutation,
} from "../../../generated/graphql";


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
  const skill = data?.skill?.data;

  if (fetching) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

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

export default EditSkill;
