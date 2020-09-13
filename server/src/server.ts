require("dotenv").config();

import "reflect-metadata";
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { cors } from "./middlewares/cors";
import { AppContext } from "./types";

const main = async () => {
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
