export {};

declare global {
  namespace Express {
    interface Session {
      profileId: string;
    }
  }
}
