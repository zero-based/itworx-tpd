import { Request, Response } from "express";

export type AppContext = {
  req: Request;
  res: Response;
};
