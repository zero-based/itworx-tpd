declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    CLIENT_URL: string;
    SESSION_SECRET: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
  }
}
