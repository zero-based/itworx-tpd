import React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { FILL, Tab, Tabs } from "baseui/tabs-motion";
import { Label4 } from "baseui/typography";

import { Profile } from "../components/profile/Profile";
import { EmployeesProfiles, useMeQuery } from "../graphql/types";
import { withAuth } from "../hocs/withAuth";
import { EmployeeSkillTable } from "../components/skills/EmployeeSkillTable";
import { EmployeeCertificationTable } from "../components/certifications/EmployeeCertificationTable";
import { PageLayout } from "../components/common/PageLayout";

const Home: React.FC<{}> = () => {
  const [{ data, fetching }] = useMeQuery();
  const [activeKey, setActiveKey] = React.useState<React.Key>("0");

  return (
    <PageLayout loading={fetching} error={!data?.me}>
      <FlexGrid display="flex" flexGridColumnCount={[1, 1, 1, 2]}>
        <FlexGridItem flex={1}>
          <Profile data={data?.me as EmployeesProfiles}></Profile>
        </FlexGridItem>
        <FlexGridItem flex={2}>
          <Tabs
            fill={FILL.fixed}
            activeKey={activeKey}
            onChange={({ activeKey }) => {
              setActiveKey(activeKey);
            }}
          >
            <Tab title="Skills">
              <EmployeeSkillTable />
            </Tab>
            <Tab title="Certifications">
              <EmployeeCertificationTable />
            </Tab>
            <Tab title="Trainings">
              <Label4>No Trainings yet</Label4>
            </Tab>
          </Tabs>
        </FlexGridItem>
      </FlexGrid>
    </PageLayout>
  );
};

export default withAuth(Home);
