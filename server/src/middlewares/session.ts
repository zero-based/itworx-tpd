import connectRedis from "connect-redis";
import sessionInit from "express-session";
import redis from "redis";

import { IS_PROD, IS_SECURE, SESSION_COOKIE_NAME } from "../utils/constants";

export const RedisStore = connectRedis(sessionInit);
export const redisClient = redis.createClient();

export const session = sessionInit({
  name: SESSION_COOKIE_NAME,
  store: new RedisStore({
    client: redisClient,
    disableTouch: true,
    disableTTL: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    secure: IS_PROD && IS_SECURE,
    sameSite: "lax",
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
});
