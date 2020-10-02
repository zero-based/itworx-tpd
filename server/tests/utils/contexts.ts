import { UserRole } from "../../src/types/UserRole";
import { mockContext } from "./mockContext";

export const emptyCtx = mockContext();

export const adminCtx = mockContext({
  profileId: "1",
  userName: "Test Admin",
  userRole: UserRole.ADMIN,
});

export const managerCtx = mockContext({
  profileId: "2",
  userName: "Test Manager",
  userRole: UserRole.MANAGER,
});

export const employeeCtx = mockContext({
  profileId: "3",
  userName: "Test Employee",
  userRole: UserRole.EMPLOYEE,
});
