import { AppContext, AppSession } from "../../src/types";

export const mockContext = (
  session: AppSession = { profileId: null, userName: null, userRole: null }
): AppContext => {
  return {
    res: null,
    req: {
      session: session as any,
    } as any,
  };
};
