import corsInit from "cors";

export const cors = corsInit({
  origin: process.env.CLIENT_URL,
  credentials: true,
});
