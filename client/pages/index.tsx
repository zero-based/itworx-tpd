import React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { FILL, Tab, Tabs } from "baseui/tabs-motion";
import { Label4 } from "baseui/typography";

import { Loading } from "../components/common/Loading";
import { Profile } from "../components/profile/Profile";
import { EmployeesProfiles, useMeQuery } from "../graphql/types";
import { withAuth } from "../hocs/withAuth";
import { EmployeeSkills } from "../components/profile/employeeSkill";

const Home: React.FC<{}> = () => {
  const [{ data, fetching }] = useMeQuery();
  const [activeKey, setActiveKey] = React.useState<React.Key>("0");

  if (fetching) return <Loading />;
  if (!data?.me) return <p>Something wrong. Please try again later</p>;

  return (
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
            <Label4>
              <EmployeeSkills />
            </Label4>
          </Tab>
          <Tab title="Certificates">
            <Label4>No Certificates yet</Label4>
          </Tab>
          <Tab title="Trainings">
            <Label4>No Trainings yet</Label4>
          </Tab>
        </Tabs>
      </FlexGridItem>
    </FlexGrid>
  );
};

export default withAuth(Home);
