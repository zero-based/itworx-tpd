import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRoleQuery } from "../../graphql/types";

export const AuthProvider: React.FC = ({ children }) => {
  const [{ data, fetching }] = useRoleQuery();

  return (
    <AuthContext.Provider
      value={{
        isLoading: fetching,
        role: data?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
