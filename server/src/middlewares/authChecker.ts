import { AuthChecker } from "type-graphql";
import { AppContext } from "../types";

export const authChecker: AuthChecker<AppContext> = (resolverData, roles) => {
  const { context } = resolverData;
  const userRole = context.req.session?.userRole;

  // Deny access if the user is not logged in
  if (!userRole) return false;

  // Allow access if the user's role gives him permission,
  // or if no roles were specified (i.e. accessible to all authenticated users)
  return roles.includes(userRole) || roles.length === 0;
};
