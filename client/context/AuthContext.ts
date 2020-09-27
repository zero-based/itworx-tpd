import React from "react";
import { UserRole } from "../generated/graphql";

export interface IAuthContext {
  isLoading: boolean;
  role: UserRole | null;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLoading: true,
  role: null,
});
