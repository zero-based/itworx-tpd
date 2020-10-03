import React from "react";
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

  return <SkillTable loading={fetching} data={data?.skills.data?.items} />;
};

export default withAuth(ViewSkill, [UserRole.Admin]);
