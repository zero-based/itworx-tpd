export {};

declare global {
  namespace Express {
    interface Session {
      userId: number;
    }
  }
}
