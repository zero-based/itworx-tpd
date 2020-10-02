import { Request, Response } from "express";
import { UserRole } from "./UserRole";

export type AppContext = {
  req: Request;
  res: Response;
};

export type AppSession = {
  profileId: string;
  userRole: UserRole;
  userName: string;
};
