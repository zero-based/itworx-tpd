import { AppSession } from "src/types";

declare global {
  namespace Express {
    interface Session extends AppSession {}
  }
}
