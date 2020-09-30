import React from "react";
import { useStyletron } from "baseui";
import { Avatar } from "baseui/avatar";
import { Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Label1, Label2, Label3 } from "baseui/typography";

import { EmployeesProfiles } from "../../graphql/types";
import { ProfileItem } from "./ProfileItem";

interface ProfileProps {
  data: EmployeesProfiles;
}

export const Profile: React.FC<ProfileProps> = ({ data }) => {
  const [, theme] = useStyletron();

  return (
    <Block display="flex" flexDirection="column" padding="0 32px">
      <FlexGrid flexGridColumnCount={2} gridColumnGap="24px">
        <Avatar
          size="120px"
          name={data.name}
          src={data.employeeProfilePicture ?? undefined}
        />

        <FlexGridItem
          display="flex"
          flexDirection="column"
          justifyContent="center"
          margin="12px 0"
        >
          <Label1>{data.name}</Label1>
          <Label2 $style={{ fontStyle: "italic", opacity: 0.64 }}>
            {data.title}
          </Label2>
          <Label3 color={theme.colors.accent} marginTop="8px">
            {data.employeeEmail}
          </Label3>
        </FlexGridItem>
      </FlexGrid>

      <FlexGrid flexGridColumnCount={2}>
        <FlexGridItem>
          <ProfileItem
            title="Direct Manager"
            value={data.directManager?.name ?? "NONE"}
          />
          <ProfileItem title="Cost Center" value={data.costCenter} />
          <ProfileItem title="WorkGroup" value={data.workgroup} />
        </FlexGridItem>
        <FlexGridItem>
          <ProfileItem title="Mobile Number" value={data.mobileNumber} />
          <ProfileItem title="Start Date" value={data.hiringDate} />
          <ProfileItem title="Function" value={data.function} />
        </FlexGridItem>
      </FlexGrid>
    </Block>
  );
};
