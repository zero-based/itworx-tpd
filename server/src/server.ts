require("dotenv").config();

import "reflect-metadata";
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { cors } from "./middlewares/cors";
import { AppContext } from "./types";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    logging: true,
    debug: true,
    entities: [path.join(__dirname, "./entities/*.[jt]s")],
  });

  const app = express();

  app.use(cors);

  const server = new ApolloServer({
    context: ({ req, res }): AppContext => ({ req, res }),
    schema: await buildSchema({
      resolvers: [path.join(__dirname, "./resolvers/*.[jt]s")],
    }),
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    const url = `http://localhost:${process.env.PORT}`;
    console.log(`server started on ${url}`);
    console.log(`playground ready on ${url}${server.graphqlPath}`);
  });
};

main().catch((err) => {
  console.error(err);
});
