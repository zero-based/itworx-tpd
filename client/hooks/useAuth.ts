import React from "react";
import { AuthContext, IAuthContext } from "../context/AuthContext";

export function useAuth(): IAuthContext {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
