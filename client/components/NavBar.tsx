import * as React from "react";
import { StatefulMenu } from "baseui/menu";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Label1 } from "baseui/typography";
import { Button } from "baseui/button";
import { useRouter } from "next/dist/client/router";
import { Plus } from "baseui/icon";

import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { Block } from "baseui/block";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [{ data }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem />
        <Block display="flex" alignItems="center">
          <img src="/assets/logo-master.png" alt="logo" width="100px" />
        </Block>
      </StyledNavigationList>

      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <StatefulPopover
            triggerType={TRIGGER_TYPE.hover}
            content={() => (
              <StatefulMenu
                onItemSelect={({ item }) => router.push(item.route)}
                items={{
                  __ungrouped: [],
                  Requests: [
                    {
                      label: "Resource Request",
                      route: "/view/resourceRequests",
                    },
                    {
                      label: "Release Request",
                      route: "/view/releaseRequests",
                    },
                  ],
                }}
              />
            )}
          >
            <Label1>Talents</Label1>
          </StatefulPopover>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <StatefulPopover
            triggerType={TRIGGER_TYPE.hover}
            content={() => (
              <StatefulMenu
                onItemSelect={({ item }) => router.push(item.route)}
                items={{
                  __ungrouped: [],
                  Skills: [
                    {
                      label: "Skills",
                      route: "/view/skills",
                    },
                  ],
                  Certifications: [
                    {
                      label: "Certificate Providers",
                      route: "/view/certificateProviders",
                    },
                  ],
                }}
              />
            )}
          >
            <Label1>Skills & Certifications</Label1>
          </StatefulPopover>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />

      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <StatefulPopover
            triggerType={TRIGGER_TYPE.hover}
            content={() => (
              <StatefulMenu
                onItemSelect={({ item }) => router.push(item.route)}
                items={{
                  __ungrouped: [],
                  Requests: [
                    {
                      label: "Resource Request",
                      route: "/create/resourceRequest",
                    },
                    {
                      label: "Release Request",
                      route: "/create/releaseRequest",
                    },
                  ],
                  "Skills & Certificates": [
                    { label: "Skill", route: "/create/skill" },
                    {
                      label: "Certificate Provider",
                      route: "/create/certificateProvider",
                    },
                  ],
                }}
              />
            )}
          >
            <Plus size={24} />
          </StatefulPopover>
        </StyledNavigationItem>
        <StyledNavigationItem>
          {!data?.me ? (
            <Button onClick={() => router.push("/login")}>Login</Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/login");
                logout();
              }}
            >
              Logout
            </Button>
          )}
        </StyledNavigationItem>
        <StyledNavigationItem />
      </StyledNavigationList>
    </HeaderNavigation>
  );
};
