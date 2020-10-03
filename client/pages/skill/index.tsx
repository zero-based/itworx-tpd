import React from "react";
import { PageLayout } from "../../components/common/PageLayout";
import { SkillTable } from "../../components/skills/SkillTable";
import { UserRole, useSkillsQuery } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

const ViewSkill: React.FC<{}> = () => {
  const [{ data, fetching }] = useSkillsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  return (
    <PageLayout
      title="Skills"
      loading={fetching}
      error={!!data?.skills?.errors}
      contentStyle={{ height: "65vh" }}
    >
      <SkillTable data={data?.skills.data?.items} />
    </PageLayout>
  );
};

export default withAuth(ViewSkill, [UserRole.Admin]);
