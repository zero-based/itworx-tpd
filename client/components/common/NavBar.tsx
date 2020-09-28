import React from "react";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import {
  ALIGN,
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from "baseui/header-navigation";
import { Plus } from "baseui/icon";
import { StatefulMenu } from "baseui/menu";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Label1 } from "baseui/typography";
import { useRouter } from "next/dist/client/router";

import { useLogoutMutation, UserRole as R } from "../../graphql/types";
import { useAuth } from "../../hooks/useAuth";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const router = useRouter();
  const { role } = useAuth();
  const [, logout] = useLogoutMutation();

  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem />
        <Block display="flex" alignItems="center">
          <img src="/assets/logo-master.png" alt="logo" width="100px" />
        </Block>
      </StyledNavigationList>

      <StyledNavigationList $align={ALIGN.left}>
        {role == R.Admin || role == R.Manager ? (
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
        ) : null}

        {role == R.Admin ? (
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
        ) : null}
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
                  ...(role == R.Admin || role == R.Manager
                    ? {
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
                      }
                    : {}),
                  ...(role == R.Admin
                    ? {
                        Lists: [
                          { label: "Skill", route: "/create/skill" },
                          {
                            label: "Certificate Provider",
                            route: "/create/certificateProvider",
                          },
                        ],
                      }
                    : {}),
                }}
              />
            )}
          >
            <Plus size={24} />
          </StatefulPopover>
        </StyledNavigationItem>
        <StyledNavigationItem>
          {!role ? (
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
