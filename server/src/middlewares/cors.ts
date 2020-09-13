import corsInit from "cors";

export const cors = corsInit({
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true,
});
