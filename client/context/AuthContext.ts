import React from "react";
import { UserRole } from "../graphql/types";

export interface IAuthContext {
  isLoading: boolean;
  role: UserRole | null;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLoading: true,
  role: null,
});
