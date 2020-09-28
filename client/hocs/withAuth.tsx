import { Block } from "baseui/block";
import { useRouter } from "next/dist/client/router";
import { Loading } from "../components/Loading";
import { UserRole } from "../generated/graphql";
import { useAuth } from "../hooks/useAuth";

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
  const WithAuthWrapper = (props: JSX.IntrinsicAttributes) => {
    const { isLoading, role } = useAuth();
    const router = useRouter();

    if (isLoading) {
      return (
        <Block display="flex" height="100vh" width="100vw">
          <Loading />
        </Block>
      );
    }

    if (!role) {
      // unauthenticated
      router.push("/login");
      return <></>;
    }

    if (roles && roles.length > 0 && !roles.includes(role)) {
      // unauthorized
      router.push("/");
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthWrapper;
};
