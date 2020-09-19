export {};

declare global {
  namespace Express {
    interface Session {
      profileId: string;
      roleName: string;
      name: string;
    }
  }
}
