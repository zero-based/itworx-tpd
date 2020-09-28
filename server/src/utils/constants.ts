export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_SECURE = process.env.CLIENT_URL.includes("https://");
export const SESSION_COOKIE_NAME = "session";
