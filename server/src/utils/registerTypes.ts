import { registerEnumType } from "type-graphql";
import { UserRole } from "../types/UserRole";

export const registerTypes = () => {
  registerEnumType(UserRole, { name: "UserRole" });
};
