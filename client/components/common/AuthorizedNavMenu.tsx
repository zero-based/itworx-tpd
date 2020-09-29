import React from "react";
import { Block } from "baseui/block";
import { StyledNavigationItem } from "baseui/header-navigation";
import { ChevronDown } from "baseui/icon";
import { StatefulMenu } from "baseui/menu";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { useRouter } from "next/dist/client/router";

import { UserRole } from "../../graphql/types";


interface IAuthorized {
  authorizedFor?: UserRole[];
}

interface NavItem {
  label: string;
  route: string;
}

interface NavGroup extends IAuthorized {
  title: string;
  items: NavItem[];
}

interface AuthorizedNavMenuProps extends IAuthorized {
  label: React.ReactNode;
  groups: NavGroup[];
  currentRole: UserRole;
  showArrow?: boolean;
}

export const AuthorizedNavMenu: React.FC<AuthorizedNavMenuProps> = ({
  showArrow = true,
  ...props
}) => {
  if (
    props.authorizedFor &&
    !props.authorizedFor?.includes(props.currentRole)
  ) {
    // unauthorized to access the whole menu
    return null;
  }

  const router = useRouter();

  const authorizedGroups = props.groups
    .filter(
      (group) =>
        !group.authorizedFor || group.authorizedFor?.includes(props.currentRole)
    )
    .reduce((map: { [key: string]: NavItem[] }, group) => {
      return (map[group.title] = group.items), map;
    }, {});

  if (Object.keys(authorizedGroups).length === 0) {
    // no authorized groups
    return null;
  }

  return (
    <StyledNavigationItem>
      <StatefulPopover
        triggerType={TRIGGER_TYPE.hover}
        content={() => (
          <StatefulMenu
            onItemSelect={({ item }) => router.push(item.route)}
            items={{
              __ungrouped: [],
              ...authorizedGroups,
            }}
          />
        )}
      >
        <Block display="flex" alignItems="center">
          {props.label}
          {showArrow ? <ChevronDown size={24} /> : null}
        </Block>
      </StatefulPopover>
    </StyledNavigationItem>
  );
};
