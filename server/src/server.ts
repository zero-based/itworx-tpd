require("dotenv").config();

import "reflect-metadata";
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { authChecker } from "./middlewares/authChecker";
import { cors } from "./middlewares/cors";
import { session } from "./middlewares/session";
import { AppContext } from "./types";
import { registerTypes } from "./utils/registerTypes";
import { IS_PROD } from "./utils/constants";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    logging: !IS_PROD,
    debug: !IS_PROD,
    entities: [path.join(__dirname, "./entities/*.[jt]s")],
  });

  const app = express();

  app.use(cors);
  app.use(session);

  registerTypes();

  const server = new ApolloServer({
    context: ({ req, res }): AppContext => ({ req, res }),
    schema: await buildSchema({
      resolvers: [path.join(__dirname, "./resolvers/*.[jt]s")],
      validate: false,
      authChecker,
    }),
  });

  server.applyMiddleware({ app, cors: false });

  const port = process.env.PORT;
  app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`server started on ${url}`);
    console.log(`playground ready on ${url}${server.graphqlPath}`);
  });
};

main().catch((err) => {
  console.error(err);
});
