import React from "react";
import { Button } from "baseui/button";
import { CSVLink } from "react-csv";
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

  const skills = data?.skills.data?.items;

  const csvHeaders = [
    { label: "Skill Id", key: "skillId" },
    { label: "Skill Name", key: "skillName" },
  ];

  return (
    <PageLayout
      title="Skills"
      loading={fetching}
      error={!!data?.skills?.errors}
      contentStyle={{ height: "65vh" }}
      action={
        skills ? (
          <Button>
            <CSVLink
              data={skills}
              filename="Skills.csv"
              style={{ color: "white", textDecoration: "none" }}
              headers={csvHeaders}
            >
              Export
            </CSVLink>
          </Button>
        ) : null
      }
    >
      <SkillTable data={data?.skills.data?.items} />
    </PageLayout>
  );
};

export default withAuth(ViewSkill, [UserRole.Admin]);
