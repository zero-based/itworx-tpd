import React from "react";
import { Block } from "baseui/block";
import { useRouter } from "next/router";
import { Loading } from "../components/common/Loading";
import { MainLayout } from "../components/common/MainLayout";
import { useRoleQuery, UserRole } from "../graphql/types";

/**
 * A Higher Order Component to protect pages from unauthenticated and
 * unauthorized usage.
 * Redirects to "/login" if unauthenticated.
 * Redirects to "/" if unauthorized.
 *
 * @param roles the roles authorized to access the page,
 *              empty array or undefined if all.
 */
export const withAuth = (
  WrappedComponent: React.ComponentType,
  roles?: UserRole[]
) => {
  const WithAuthWrapper: React.FC = (props) => {
    const router = useRouter();
    const [{ data, fetching }] = useRoleQuery();

    if (fetching) {
      return (
        <Block display="flex" height="100vh" width="100vw">
          <Loading />
        </Block>
      );
    }

    if (!data?.role) {
      // unauthenticated
      router.push("/login");
      return <></>;
    }

    if (roles && roles.length > 0 && !roles.includes(data.role)) {
      // unauthorized
      router.push("/");
      return <></>;
    }

    return (
      <MainLayout>
        <WrappedComponent {...props} />
      </MainLayout>
    );
  };

  return WithAuthWrapper;
};
