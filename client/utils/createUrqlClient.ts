import { LoginMutation, MeDocument, MeQuery } from "../generated/graphql";

import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { updateQuery } from "./updateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: { credentials: "include" as const },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            updateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (!result.login) {
                  return query;
                } else {
                  return {
                    me: result.login,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
