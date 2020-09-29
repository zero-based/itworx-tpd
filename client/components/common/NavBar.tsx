import React from "react";
import { Block } from "baseui/block";
import { Button, KIND, SIZE } from "baseui/button";
import {
  ALIGN,
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from "baseui/header-navigation";
import { Plus } from "baseui/icon";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";

import {
  useLogoutMutation,
  useRoleQuery,
  UserRole as R,
} from "../../graphql/types";
import { AuthorizedNavMenu } from "./AuthorizedNavMenu";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const router = useRouter();
  const [{ data }] = useRoleQuery();
  const [, logout] = useLogoutMutation();

  const role = data?.role!;

  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            flexWrap: "wrap",
            backgroundColor: $theme.colors.primary700,
            color: "white",
          }),
        },
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem />
        <Block display="flex" alignItems="center" paddingTop="4px">
          <NextLink href="/" passHref>
            <a>
              <img src="/assets/logo-white.png" alt="logo" width="100px" />
            </a>
          </NextLink>
        </Block>
      </StyledNavigationList>

      <StyledNavigationList $align={ALIGN.left}>
        <AuthorizedNavMenu
          label="Talents"
          currentRole={role}
          authorizedFor={[R.Admin, R.Manager]}
          groups={[
            {
              title: "Requests",
              items: [
                {
                  label: "Resource Request",
                  route: "/view/resourceRequests",
                },
                {
                  label: "Release Request",
                  route: "/view/releaseRequests",
                },
              ],
            },
          ]}
        />

        <AuthorizedNavMenu
          label="Skills & Certifications"
          currentRole={role}
          authorizedFor={[R.Admin]}
          groups={[
            {
              title: "Skills",
              items: [
                {
                  label: "Skills",
                  route: "/view/skills",
                },
              ],
            },
            {
              title: "Certifications",
              items: [
                {
                  label: "Certificate Providers",
                  route: "/view/certificateProviders",
                },
              ],
            },
          ]}
        />
      </StyledNavigationList>

      <StyledNavigationList $align={ALIGN.center} />

      <StyledNavigationList $align={ALIGN.right}>
        <AuthorizedNavMenu
          label={<Plus size={24} color="white" />}
          showArrow={false}
          currentRole={role}
          groups={[
            {
              title: "Requests",
              authorizedFor: [R.Admin, R.Manager],
              items: [
                {
                  label: "Resource Request",
                  route: "/create/resourceRequest",
                },
                {
                  label: "Release Request",
                  route: "/create/releaseRequest",
                },
              ],
            },
            {
              title: "Lists",
              authorizedFor: [R.Admin],
              items: [
                { label: "Skill", route: "/create/skill" },
                {
                  label: "Certificate Provider",
                  route: "/create/certificateProvider",
                },
              ],
            },
          ]}
        />

        <StyledNavigationItem>
          <Button
            kind={KIND.minimal}
            size={SIZE.compact}
            onClick={() => {
              router.push("/login");
              logout();
            }}
          >
            Logout
          </Button>
        </StyledNavigationItem>
        <StyledNavigationItem />
      </StyledNavigationList>
    </HeaderNavigation>
  );
};
