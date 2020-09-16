import { redisClient, RedisStore } from "./redis";

import session from "express-session";

export const appSession = session({
  name: "qid",
  store: new RedisStore({
    client: redisClient,
    disableTouch: true,
    disableTTL: true,
  }),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
  secret: "keyboard cat",
  resave: false,
});
