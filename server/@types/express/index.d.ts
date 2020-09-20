export {};

declare global {
  namespace Express {
    interface Session {
      profileId: string;
      userRole: string;
      userName: string;
    }
  }
}
