import { UserRole } from "src/types/UserRole";

export {};

declare global {
  namespace Express {
    interface Session {
      profileId: string;
      userRole: UserRole;
      userName: string;
    }
  }
}
